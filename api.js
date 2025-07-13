const axios = require('axios');
const db = require('./db');

async function fetchUsers() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
}

async function addUsers(users) {
    const dbcon = db.prepare("INSERT OR IGNORE INTO users (id, username, email) VALUES (?, ?, ?)");
    for (const user of users) {
        dbcon.run(user.id, user.username, user.email);
    }
    dbcon.finalize();
}
module.exports = { fetchUsers, addUsers }