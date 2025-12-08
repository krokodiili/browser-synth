const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Setup
let db;
try {
    db = new Database('songs.db'); // Removed verbose for cleaner logs, can add { verbose: console.log } if needed
    console.log('Connected to the SQLite database.');

    // Create table
    db.prepare(`CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`).run();
} catch (err) {
    console.error('Error opening database', err.message);
}

// Routes

// Get all songs (metadata only)
app.get('/songs', (req, res) => {
    try {
        const sql = "SELECT id, name, created_at FROM songs ORDER BY created_at DESC";
        const rows = db.prepare(sql).all();
        res.json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Get a specific song
app.get('/songs/:id', (req, res) => {
    try {
        const sql = "SELECT * FROM songs WHERE id = ?";
        const row = db.prepare(sql).get(req.params.id);

        if (!row) {
            res.status(404).json({ "error": "Song not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Create a new song
app.post('/songs', (req, res) => {
    try {
        const { name, data } = req.body;
        if (!name || !data) {
            res.status(400).json({ "error": "Name and data are required" });
            return;
        }

        const dataString = typeof data === 'string' ? data : JSON.stringify(data);
        const sql = 'INSERT INTO songs (name, data) VALUES (?, ?)';
        const info = db.prepare(sql).run(name, dataString);

        res.json({
            "message": "success",
            "data": {
                id: info.lastInsertRowid,
                name: name
            }
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
