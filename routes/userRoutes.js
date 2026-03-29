const express = require('express');
const router = express.Router();

const { allUsersList, userProfile, createAccount } = require('../controllers/userControllers');


router.get('/', allUsersList);
router.get('/:id', userProfile);

router.post('/', createAccount);

module.exports = router;