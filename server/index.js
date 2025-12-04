const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Setup
const db = new sqlite3.Database('./songs.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err);
            }
        });
    }
});

// Routes

// Get all songs (metadata only)
app.get('/songs', (req, res) => {
    const sql = "SELECT id, name, created_at FROM songs ORDER BY created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Get a specific song
app.get('/songs/:id', (req, res) => {
    const sql = "SELECT * FROM songs WHERE id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ "error": "Song not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Create a new song
app.post('/songs', (req, res) => {
    const { name, data } = req.body;
    if (!name || !data) {
        res.status(400).json({ "error": "Name and data are required" });
        return;
    }

    // Ensure data is stringified if it came as object
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);

    const sql = 'INSERT INTO songs (name, data) VALUES (?, ?)';
    const params = [name, dataString];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                id: this.lastID,
                name: name
            }
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
