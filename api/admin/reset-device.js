const { sql } = require('@vercel/postgres');
const jwt = ('jsonwebtoken');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: 'Method not allowed', error: false });
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, error: 'Missing code' });
    const { rowCount } = await sql`UPDATE vip_codes SET device_id = null WHERE code = ${code}`;
    if (!rowCount) return res.status(404).json({ success: false, error: 'Code not found' });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: err.name === 'JsonWebTokenError' ? 'Invalid token' : 'Server error' });
  }
};
