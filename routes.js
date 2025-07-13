const express = require('express');
const router = express.Router();
const db = require('./db');
const { fetchUsers, addUsers } = require('./api');

router.get('/users', async (req, res) => {
    db.all("SELECT * FROM users", async (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        if (rows.length === 0) {
            const users = await fetchUsers();
            await addUsers(users);
            return res.json(users);
        }
        else {
            return res.json(rows);
        }
    });
});

module.exports = router;