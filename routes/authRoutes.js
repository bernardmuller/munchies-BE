const { Router } = require('express');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth')

const router = Router();

router.get('/', authController.auth);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/auth', auth, authController.auth);

module.exports = router;