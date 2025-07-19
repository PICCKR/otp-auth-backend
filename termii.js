const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://api.ng.termii.com/api/whatsapp/send';
const API_KEY = process.env.TERMII_API_KEY;

exports.sendWhatsApp = async (to, message) => {
  return axios.post(BASE_URL, {
    to,
    message,
    api_key: API_KEY
  });
};
