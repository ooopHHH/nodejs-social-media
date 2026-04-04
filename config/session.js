const pool = require('../db');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const sessionConfig = {
  store: new pgSession({ pool }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
};

module.exports = sessionConfig;