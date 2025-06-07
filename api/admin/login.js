const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Missing email or password' });
  }
  if (email !== 'otuto.collins@gmail.com') {
    return res.status(401).json({ success: false, error: 'Invalid email' });
  }
  try {
    // Test database connection
    await sql`SELECT 1`;
    const { rows } = await sql`SELECT * FROM admins WHERE email = ${email}`;
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: `Server error: ${err.message}` });
  }
};
