// backend/scripts/create-vip.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

mongoose.connect('mongodb+srv://your-username:your-password@cluster0.mongodb.net/futbolx?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function createVipUser(username, password, email) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      isVip: true,
      email
    });
    console.log(`Created VIP user: ${user.username}`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Example usage
createVipUser('vip_user123', 'SecurePass123', 'user@example.com');
