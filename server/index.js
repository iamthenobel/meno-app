const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./meno.db');
const SECRET_KEY = 'supersecretkey'; // Use env in production

app.use(cors());
app.use(express.json());

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT,
    content TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

// Middleware for JWT auth
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Signup
app.post('/api/signup', async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)`,
      [fullname, email, hashedPassword, role],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Email already exists.' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      res.status(500).json({ error: 'Login error' });
    }
  });
});

// ✅ Protected GET: Get notes for logged-in user
app.get('/api/notes', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all('SELECT * FROM notes WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Protected POST: Save a note for the user
app.post('/api/notes', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  db.run(
    'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});
// ✅ Protected PUT: Update a specific note
app.put('/api/notes/:id', authenticateToken, (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;

  db.run(
    'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?',
    [title, content, noteId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0) {
        // Either note not found or user doesn't own it
        return res.status(404).json({ error: 'Note not found or not authorized' });
      }

      res.json({ message: 'Note updated successfully' });
    }
  );
});
// ✅ Protected DELETE: Delete a specific note
app.delete('/api/notes/:id', authenticateToken, (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  db.run(
    'DELETE FROM notes WHERE id = ? AND user_id = ?',
    [noteId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Note not found or not authorized' });
      }

      res.json({ message: 'Note deleted successfully' });
    }
  );
});

// Start server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
