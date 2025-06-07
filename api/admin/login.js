const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: 'Missing email or password' });
  if (email !== 'otuto.collins@gmail.com') return res.status(401).json({ success: 'Invalid or expired' error: 'Invalid email' });
  try {
    const { rows } = await sql`SELECT * FROM admins WHERE email = ${email}`;
    if (rows.length === 0) return res.status(401).json({ success: 'Invalid or expired' });
    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).json({ success: 'Invalid or expired' });
    const token = await jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(501).json({ success: 'Server error' });
  }
};
