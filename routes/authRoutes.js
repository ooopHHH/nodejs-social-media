const express = require('express');

const { login, logout, patchUserData, removeUser } = require('../controllers/authControllers');
const router = express.Router();
const requireAuthorization = require('../middleware/requireAuthorization');
const requireAuthentication = require('../middleware/requireAuthentication');
const requireAuthorizationOrOwner = require('../middleware/requireAuthorizationOrOwner');

router.post('/login/:id', login);
router.post('/logout', requireAuthentication, logout);

router.patch('/:id', requireAuthentication, requireAuthorizationOrOwner, patchUserData);

router.delete('/:id', requireAuthentication, requireAuthorizationOrOwner, removeUser);


module.exports = router;