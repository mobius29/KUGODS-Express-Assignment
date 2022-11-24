const { Router } = require('express');
const { allUsers, getUser, signIn, register, findByTag, accessAdminPage } = require('./ctrl');
const { authentification } = require('../../middleware/authentification')

const router = Router();

router.get('/result', findByTag);
router.post('/', register);
router.post('/sign-in', signIn);
router.get('/admin-page', authentification, accessAdminPage);
router.get('/', allUsers);
router.get('/:id', getUser);

module.exports = router;