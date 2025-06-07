const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await sql`SELECT code, expiry, user_email, device_id FROM vip_codes WHERE expiry > NOW() ORDER BY created_at DESC`;
    return res.json({ success: true, codes: rows });
  } catch (err) {
    return res.status(401).json({ success: err.name === 'JsonWebTokenError' ? 'Invalid token' : 'Server error' });
  }
};
