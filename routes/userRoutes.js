const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

router.get('/:id', auth, catchAsync(userController.get));

router.put('/:id', auth, catchAsync(userController.edit));

router.put('/changeRole', auth, catchAsync(userController.changeRole));

router.delete('/:d', auth, catchAsync(userController.delete));

router.get('/', auth, catchAsync( userController.getAll));

module.exports = router;
