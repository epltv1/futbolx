// api/streams.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '../stream.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading stream.json:', err);
      res.status(500).json({ error: 'Failed to read stream data' });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  });
};
