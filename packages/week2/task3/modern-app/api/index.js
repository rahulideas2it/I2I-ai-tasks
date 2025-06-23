module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Strip the "/modernapi" prefix
  let url = req.url.replace(/^\/modernapi/, '') || '/';
  const { method } = req;

  if (method === 'GET' && url === '/') {
    return res.json({
      message: 'Modern API Root',
      status: 'running',
      endpoints: ['GET /modernapi', 'GET /modernapi/health', 'GET /modernapi/users']
    });
  }

  if (method === 'GET' && url === '/health') {
    return res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  }

  if (method === 'GET' && url === '/users') {
    return res.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ error: 'Not found', path: url }));
};
