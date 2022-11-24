const { Router } = require('express');
const ctrl = require('./ctrl');

const router = Router();

router.get('/users/results', ctrl.getNameByString);

router.get('/users', ctrl.getAllName);
 
router.get('/users/:id', ctrl.getByID);

router.put('/users/:id', ctrl.modifyNameByID);

router.delete('/users/:id', ctrl.deleteByID);

module.exports = router;
