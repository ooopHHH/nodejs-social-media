const express = require('express');
const bcrypt = require('bcrypt')

const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users')
    res.status(200).json(rows);
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0)  {
      return res.status(404).json({ message: "this user doesn't exist" });
    }
      res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  const { name, dob, email_address, phone_number } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (user_name, date_of_birth, email_address, phone_number) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [name, dob, email_address, phone_number]
    );
    res.status(201).json({ message: `user ${rows[0].user_name} created` });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ 
        error: 'Email or phone number already in use' 
      })
    } else {
      next(err);
    }
  }
});

router.post('/login/:id', async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body
  try {
    const { rows } = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [id]
    )
    const hash = rows[0].password;
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return res.status(401).json({ message: `incorret password` })
    }
    res.status(200).json({ message: 'correct password' })
  } catch (error) {
    next(error)
  }
})


router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, dateOfBirth, emailAddress, phoneNumber } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE users SET
        user_name = COALESCE($1, user_name),
        date_of_birth = COALESCE($2, date_of_birth),
        email_address = COALESCE($3, email_address),
        phone_number  = COALESCE($4, phone_number)
      WHERE id = $5
      RETURNING *`,
      [name, dateOfBirth, emailAddress, phoneNumber, id]
    )
    if (rows.length === 0)  {
      return res.status(404).json({ message: "this user doesn't exist" });
    }
    res.status(200).json({ message: `user ${rows[0].user_name} updated successfully` });
  } catch(err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email or phone number already in use' })
    } else {
      next(err);
    }
  }
});


router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try{
    const { rows } = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "this user doesn't exist" });
    }
    res.status(200).json({ 
      message: `user ${rows[0].user_name} deleted successfully`
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;