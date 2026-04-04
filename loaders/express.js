const express = require('express');

const pool = require('../db');
const userRouter = require('../routes/userRoutes');
const authRouter = require('../routes/authRoutes');
const errorHandler = require('../middleware/errorHandling');
const sessionConfig = require('../config/session')
const session = require('express-session');

module.exports = (app) => {
  // Built-in middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

  // Session
  app.use(session(sessionConfig));

  // Routes Middleware
  app.use('/user', userRouter);
  app.use('/auth', authRouter);

  // Error handler middleware
  app.use(errorHandler);
};