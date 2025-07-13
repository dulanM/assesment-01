const axios = require('axios');
const db = require('./db');

async function fetchUsers() {
  // Retrieve from db first, If not retrieve from the API
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", async (err, rows) => {
      if (err) return reject(err);

      if (rows.length === 0) {
        try {
          const res = await axios.get('https://jsonplaceholder.typicode.com/users');
          await addUsers(res.data);
          return resolve(res.data);
        } catch (error) {
          return reject(error);
        }
      }
      else {
        return resolve(rows);
      }
    });


  });
}

async function addUsers(users) {
  const dbcon = db.prepare("INSERT OR IGNORE INTO users (id, username, email) VALUES (?, ?, ?)");
  for (const user of users) {
    dbcon.run(user.id, user.username, user.email);
  }
  dbcon.finalize();
}
module.exports = { fetchUsers, addUsers }