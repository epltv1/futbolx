// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVip: { type: Boolean, default: false },
  email: { type: String }
});

module.exports = mongoose.model('User', userSchema);
