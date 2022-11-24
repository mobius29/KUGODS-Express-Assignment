const { Router } = require('express');
const users = require('./users');
const auth = require('./auth');

const router = Router();

router.use('/api', users);
router.use('/api', auth);

module.exports = router;
