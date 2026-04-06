require('dotenv').config();

const express = require('express');
const app = express();

require('./loaders/express')(app);

module.exports = app