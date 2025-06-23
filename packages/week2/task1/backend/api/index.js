const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const url = require('url');

// In-memory storage (for demo only)
const users = [];
const notes = [];

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key';

module.exports = async (req, res) => {
  // CORS + Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname.replace(/^\/notesapi/, '') || '/';
  const method = req.method;

  // Helper: parse JSON body
  const getBody = () =>
    new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => (body += chunk.toString()));
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (err) {
          reject(err);
        }
      });
    });

  // Auth middleware
  const authenticateToken = () => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  };

  // Routes
  if (method === 'GET' && pathname === '/') {
    return res.end(
      JSON.stringify({
        message: 'Notes API is running',
        endpoints: [
          'POST /notesapi/auth/signup',
          'POST /notesapi/auth/login',
          'GET /notesapi/notes',
          'POST /notesapi/notes',
          'PUT /notesapi/notes/:id',
          'DELETE /notesapi/notes/:id'
        ]
      })
    );
  }

  if (method === 'POST' && pathname === '/auth/signup') {
    try {
      const { email, password } = await getBody();
      if (!email || !password) return res.end(JSON.stringify({ error: 'Email and password required' }));

      if (users.find(u => u.email === email)) {
        return res.end(JSON.stringify({ error: 'User already exists' }));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: Date.now(),
        email,
        password: hashedPassword,
        created_at: new Date().toISOString()
      };
      users.push(user);

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      return res.end(JSON.stringify({ message: 'Signup successful', token, user: { id: user.id, email } }));
    } catch (err) {
      return res.end(JSON.stringify({ error: 'Signup failed' }));
    }
  }

  if (method === 'POST' && pathname === '/auth/login') {
    try {
      const { email, password } = await getBody();
      const user = users.find(u => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.end(JSON.stringify({ error: 'Invalid credentials' }));
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      return res.end(JSON.stringify({ message: 'Login successful', token, user: { id: user.id, email } }));
    } catch (err) {
      return res.end(JSON.stringify({ error: 'Login failed' }));
    }
  }

  if (method === 'GET' && pathname === '/notes') {
    const user = authenticateToken();
    if (!user) return res.end(JSON.stringify({ error: 'Unauthorized' }));
    const userNotes = notes.filter(n => n.user_id === user.id);
    return res.end(JSON.stringify(userNotes));
  }

  if (method === 'POST' && pathname === '/notes') {
    const user = authenticateToken();
    if (!user) return res.end(JSON.stringify({ error: 'Unauthorized' }));

    const { title, content } = await getBody();
    if (!title || !content) return res.end(JSON.stringify({ error: 'Title and content required' }));

    const note = {
      id: Date.now(),
      user_id: user.id,
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    notes.push(note);
    return res.end(JSON.stringify(note));
  }

  if (method === 'PUT' && pathname.startsWith('/notes/')) {
    const user = authenticateToken();
    if (!user) return res.end(JSON.stringify({ error: 'Unauthorized' }));
    const noteId = parseInt(pathname.split('/')[2]);
    const index = notes.findIndex(n => n.id === noteId && n.user_id === user.id);
    if (index === -1) return res.end(JSON.stringify({ error: 'Note not found' }));

    const { title, content } = await getBody();
    notes[index] = {
      ...notes[index],
      title: title || notes[index].title,
      content: content || notes[index].content,
      updated_at: new Date().toISOString()
    };
    return res.end(JSON.stringify(notes[index]));
  }

  if (method === 'DELETE' && pathname.startsWith('/notes/')) {
    const user = authenticateToken();
    if (!user) return res.end(JSON.stringify({ error: 'Unauthorized' }));
    const noteId = parseInt(pathname.split('/')[2]);
    const index = notes.findIndex(n => n.id === noteId && n.user_id === user.id);
    if (index === -1) return res.end(JSON.stringify({ error: 'Note not found' }));
    notes.splice(index, 1);
    return res.end(JSON.stringify({ message: 'Note deleted successfully' }));
  }

  // Fallback
  res.statusCode = 404;
  return res.end(JSON.stringify({ error: 'Not found', path: pathname }));
};
