const store = new Map();

module.exports = {
  saveOTP: (phone, otp) => store.set(phone, { otp, expires: Date.now() + 5 * 60000 }),
  getOTP: (phone) => store.get(phone),
  deleteOTP: (phone) => store.delete(phone)
};
