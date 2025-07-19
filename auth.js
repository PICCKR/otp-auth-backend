const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { sendWhatsApp } = require('../services/termii');
const { saveOTP, getOTP, deleteOTP } = require('../utils/otpStore');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/request-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOTP(phone, otp);

  try {
    const message = `Your login code is: ${otp}`;
    await sendWhatsApp(phone, message);
    res.json({ success: true, message: 'OTP sent via WhatsApp' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const record = getOTP(phone);
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  deleteOTP(phone);
  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ success: true, token });
});

module.exports = router;
