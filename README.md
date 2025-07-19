# WhatsApp OTP Backend with Termii

## Features
- Request OTP via WhatsApp using Termii API
- Verify OTP and issue JWT token
- Lightweight Node.js + Express app

## Setup
1. Copy `.env.sample` to `.env` and fill in your Termii API key and JWT secret.
2. Run `npm install`
3. Start the app: `node server.js` or use `pm2`

## Endpoints
- POST `/api/auth/request-otp` – `{ "phone": "+2348012345678" }`
- POST `/api/auth/verify-otp` – `{ "phone": "+2348012345678", "otp": "123456" }`
>>>>>>> 88d23ab (Add WhatsApp OTP backend)
