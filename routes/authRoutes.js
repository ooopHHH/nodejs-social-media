const express = require('express');

const { login, logout, patchUserData, removeUser } = require('../controllers/authControllers');
const router = express.Router();


router.post('/login/:id', login);
router.post('/logout', logout);

router.patch('/:id', patchUserData);

router.delete('/:id', removeUser)


module.exports = router;