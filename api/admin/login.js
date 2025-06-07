const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  const { email, password } = req.body;
  console.log('Received email:', email, 'Password length:', password ? password.length : 'undefined');
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Missing email or password' });
  }
  if (email.toLowerCase() !== 'otuto.collins@gmail.com') {
    return res.status(401).json({ success: false, error: 'Invalid email' });
  }
  try {
    await sql`SELECT 1`;
    console.log('Database connection successful');
    const { rows } = await sql`SELECT * FROM admins WHERE email = ${email}`;
    console.log('Query result:', rows);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'No admin found with this email' });
    }
    const admin = rows[0];
    console.log('Stored hash:', admin.password);
    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isValid);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Password does not match' });
    }
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: `Server error: ${err.message}` });
  }
};
