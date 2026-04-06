const express = require('express');
const router = express.Router();

const { allUsersList, userProfile, createAccount } = require('../controllers/userControllers');

const requireAuthorization = require('../middleware/requireAuthorization');
const requireAuthentication = require('../middleware/requireAuthentication')


router.get('/', requireAuthentication, allUsersList);
router.get('/:id', userProfile);

router.post('/', createAccount);

module.exports = router;