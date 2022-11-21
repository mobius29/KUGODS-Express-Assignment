// src/controller/users/index.js
const { Router } = require('express');
const ctrl = require('./ctrl');
const router = Router();
router.get('/', ctrl.show);
router.get('/results', ctrl.findByStr);
router.get('/:id', ctrl.findById);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteById);
module.exports = router;