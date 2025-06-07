const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { expiryPeriod, userEmail } = req.body;
    if (!['1', '3', '12'].includes(expiryPeriod) return res.status(400).json({ success: false, error: 'Invalid expiry period' });
    let code;
    let exists;
    do {
      code = generateCode();
      const { rows } = await sql`SELECT 1 FROM vip_codes WHERE code = ${code}`;
      exists = rows.length > 0;
    } while (exists);
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + parseInt(expiryPeriod));
    await sql`INSERT INTO vip_codes (code, expiry, user_email) VALUES (${code}, ${expiry.toISOString()}, ${userEmail || null})`;
    res.status(200).json({ success: true, code });
  } catch (err) {
    res.status(401).json({ success: err.name === 'JsonWebTokenError' ? 'Invalid token' : 'Server error' });
  }
};
