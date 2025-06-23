module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.json({ 
    message: 'Sample API Working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
};