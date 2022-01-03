const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/auth', authController.auth);

router.post('/logout', authController.logout);

router.post('/events', authController.events);

module.exports = router;