const axios = require('axios');
const db = require('./db');

async function fetchUsers() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
}

module.exports = { fetchUsers }