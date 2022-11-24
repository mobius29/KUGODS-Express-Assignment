const { Router } = require('express');
const ctrl = require('./ctrl');

const router = Router();

router.post('/auth/register', ctrl.registerUser);

router.post('/auth/login', ctrl.logIn);

router.get('/auth/logout', ctrl.logOut);

module.exports = router;
