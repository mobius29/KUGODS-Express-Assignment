const { Router } = require('express');
const users = require('./users');
const auth = require('./auth');

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
