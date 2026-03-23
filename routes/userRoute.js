const express = require('express');
const { randomUUID } = require('node:crypto');

const router = express.Router();

const pool = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users')
    res.status(200).json(rows);
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error);
  }
});


router.post('/:name/:yob', (req, res, next) => {
  const newUserId = randomUUID();
  const { name, yob } = req.params;

  try {
    users[newUserId] = {name, yob: parseInt(yob)};
    res.status(201).json({ message: `user ${newUserId} created` });
  } catch (error) {
    next(error);
  }
});


router.put('/:id/:name/:yob', (req, res, next) => {
  const { id, name, yob } = req.params;

  if (!users[id])  {
    return res.status(404).json({ message: "this user doesn't exist" });
  }
  try {
    users[id].name = name;
    users[id].yob = parseInt(yob);
    res.status(200).json({ message: `user ${id} updated successfully` });
  } catch(error) {
    next(error);
  }
});


router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!users[id]) {
    return res.status(404).json({ message: "this user doesn't exist" });
  }

  try{
    delete users[id];
    res.status(200).json({ message: `user ${id} deleted successfully`});
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;