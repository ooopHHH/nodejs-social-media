const express = require('express');

const userRouter = require('../routes/userRoute');
const { errorHandler } = require('../middleware/middleware');
const pool = require('../db');

module.exports = (app) => {
  // Built-in middleware
  app.use(express.json());

  // Routes Middleware
  app.use('/user', userRouter);

  app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

  // Error handler middleware
  app.use(errorHandler);
}