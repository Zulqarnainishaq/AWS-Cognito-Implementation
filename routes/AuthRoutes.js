const express = require('express');
const authController = require('../controllers/AuthController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/signup', authController.SignUp);
router.get('/signin', authController.SignIn);
router.get('/verify', authController.Verify);
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.user });
});

module.exports = router;