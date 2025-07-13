const express = require('express');
const router = express.Router();
const db = require('./db');
const { fetchUsers } = require('./api');

router.get('/users', async (req, res) => {
  db.all("SELECT * FROM users", async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0) {
      const users = await fetchUsers();
      return res.json(users);
    }
    else {
      return res.json(rows);
    }
  });
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM users WHERE id = ?", [id], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!row) {
      try {
        const users = await fetchUsers();
        const user = users.find(u => u.id == id);
        if (user) return res.json(user);
        else return res.status(404).json({ error: "User not found" });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
    }
    else {
      return res.json(row);
    }
  });
});

module.exports = router;