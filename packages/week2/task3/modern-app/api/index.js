module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const { method, url } = req;
  
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

  res.status(404).json({ error: 'Not found' });
};