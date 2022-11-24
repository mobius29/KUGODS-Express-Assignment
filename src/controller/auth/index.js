const { Router } = require('express');
const { register, signIn } = require('./ctrl');

const router = Router();

router.post('/register', register);
router.post('/sign-in', signIn);

module.exports = router;