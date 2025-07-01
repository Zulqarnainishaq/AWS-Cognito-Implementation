const jwt_decode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { getUserPool } = require('../helpers/AwsConfig');

// Middleware to verify JWT and refresh if expired
module.exports = async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const refreshToken = req.headers['x-refresh-token'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.replace('Bearer ', '');
  let decoded;
  try {
    decoded = jwt_decode(token);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < now) {
    // Token expired, try to refresh
    if (!refreshToken) {
      return res.status(401).json({ message: 'Token expired, refresh token required' });
    }
    // Try to refresh using Cognito
    const email = decoded.email || decoded.username || decoded.sub;
    const userPool = getUserPool();
    const userData = { Username: email, Pool: userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const refreshTokenObj = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken });
    cognitoUser.refreshSession(refreshTokenObj, (err, session) => {
      if (err) {
        return res.status(401).json({ message: 'Refresh token invalid or expired', error: err });
      }
      // Send new tokens to user
      res.set('x-new-access-token', session.getAccessToken().getJwtToken());
      res.set('x-new-id-token', session.getIdToken().getJwtToken());
      req.user = jwt_decode(session.getIdToken().getJwtToken());
      next();
    });
  } else {
    // Token valid
    req.user = decoded;
    next();
  }
}; 