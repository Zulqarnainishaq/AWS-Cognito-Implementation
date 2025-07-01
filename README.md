# AWS Cognito Implementation

This project is a Node.js Express backend that demonstrates how to integrate AWS Cognito for user authentication and authorization. It provides endpoints for user sign-up, sign-in, verification, and protected routes using JWT tokens managed by AWS Cognito.

## Features

- User registration (sign-up) with AWS Cognito
- Email verification
- User login (sign-in) with JWT token issuance
- Middleware for JWT verification and token refresh
- Protected API routes

## Project Structure

```
AWS-Cognito-Implementation/
├── cognito-services/
│   └── index.js              # Core Cognito service functions (signUp, signIn, verify)
├── controllers/
│   └── AuthController.js     # Express controllers for authentication endpoints
├── helpers/
│   └── AwsConfig.js          # AWS Cognito configuration and utility functions
├── middleware/
│   └── verifyToken.js        # Middleware to verify and refresh JWT tokens
├── routes/
│   └── AuthRoutes.js         # Express routes for authentication and protected endpoints
├── index.js                  # Main Express app entry point
├── .env-sample               # Example environment variables
├── package.json              # Project metadata and dependencies
```

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env-sample` to `.env` and fill in your AWS Cognito details:
     ```
     APP_PORT=3010
     AWS_COGNITO_USER_POOL_ID=your_user_pool_id
     AWS_COGNITO_CLIENT_ID=your_client_id
     AWS_COGNITO_REGION=your_region
     AWS_COGNITO_IDENTITY_POOL_ID=your_identity_pool_id
     ```
4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/signup` — Register a new user (expects `email` and `password` in body)
- `GET /api/verify` — Verify user email (expects `email` and `codeEmailVerify` in body)
- `GET /api/signin` — User login (expects `email` and `password` in body)
- `GET /api/protected` — Access a protected route (requires valid JWT in `Authorization` header)

## How It Works

- **cognito-services/index.js**: Handles sign-up, sign-in, and verification logic using AWS Cognito SDK.
- **helpers/AwsConfig.js**: Configures AWS SDK and Cognito User Pool, decodes JWT tokens, and manages attributes.
- **middleware/verifyToken.js**: Express middleware to validate JWT tokens and refresh them if expired using Cognito refresh tokens.
- **controllers/AuthController.js**: Express route handlers that call Cognito service functions and return responses.
- **routes/AuthRoutes.js**: Defines API routes for authentication and protected access.

## Dependencies

- `express` — Web framework
- `amazon-cognito-identity-js` — AWS Cognito SDK
- `aws-sdk` — AWS SDK for Node.js
- `dotenv` — Loads environment variables
- `jwt-decode` — Decodes JWT tokens
- `uuid`, `async`, `node-fetch` — Utilities

## Notes

- Make sure your AWS Cognito User Pool and App Client are properly configured in the AWS Console.
- Use HTTPS in production to secure token transmission.

## License

MIT
