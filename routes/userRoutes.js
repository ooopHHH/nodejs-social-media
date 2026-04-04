const express = require('express');
const router = express.Router();

const { allUsersList, userProfile, createAccount } = require('../controllers/userControllers');
const requireRole = require('../middleware/authorization');


router.get('/', requireRole('admin'), allUsersList);
router.get('/:id', userProfile);

router.post('/', createAccount);

module.exports = router;