// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://your-username:your-password@cluster0.mongodb.net/futbolx?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./models/User');

const JWT_SECRET = 'your-secret-key'; // Replace with secure key

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, isVip: user.isVip }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, isVip: user.isVip });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/vip/streams', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isVip) {
      return res.status(403).json({ message: 'VIP access required' });
    }
    const streams = JSON.parse(fs.readFileSync('../vip-streams.json'));
    res.json(streams);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
