// src/controller/auth/index.js
const { Router } = require('express');
const ctrl = require('./ctrl');
const router = Router();
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', ctrl.logout);
module.exports = router;