module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith('https://')) {
    return res.status(400).send('Invalid URL');
  }
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.apple.mpegurl, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Proxy error: ' + error.message);
  }
};
