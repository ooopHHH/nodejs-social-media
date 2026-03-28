const express = require('express');

const userRouter = require('../routes/userRoute');
const { errorHandler } = require('../middleware/middleware');
const pool = require('../db');

const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

module.exports = (app) => {
  // Built-in middleware
  app.use(express.json());

  // Session
  app.use(session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  }))

  // Routes Middleware
  app.use('/user', userRouter);

  // Error handler middleware
  app.use(errorHandler);
}