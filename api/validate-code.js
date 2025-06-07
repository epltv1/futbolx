const { sql } = require('@vercel/postgres');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const { code, deviceId } = req.body;
  if (!code || !deviceId) return res.status(400).json({ success: false, error: 'Missing code or device ID' });
  try {
    const { rows } = await sql`SELECT * FROM vip_codes WHERE code = ${code} AND expiry > NOW()`;
    if (rows.length === 0) return res.status(400.json({ success: false, error: 'Invalid or expired code' }));
    const vipCode = rows[0];
    if (vipCode.device_id && vipCode.device_id !== deviceId) return res.status(403).json({ success: false, error: 'Code is bound to another device' });
    if (!vipCode.device_id) {
      await sql`UPDATE vip_codes SET device_id = ${deviceId} WHERE code = ${code}`;
    } else {
    const token = jwt.sign({ code, deviceId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
