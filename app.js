require('dotenv').config();

const express = require('express');

const app = express();
const pool = require('./db');

require('./loaders/express')(app);

async function usersList() {
  const allUsers = await pool.query('SELECT * FROM users')
  return(allUsers.rows)
}

usersList()

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`)
});