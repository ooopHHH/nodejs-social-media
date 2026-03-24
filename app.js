require('dotenv').config();

const express = require('express');

const app = express();

require('./loaders/express')(app);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`)
});