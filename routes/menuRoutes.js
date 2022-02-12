const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

router.get('/:menuID', auth, catchAsync(menuController.get))

router.put('/:menuID/edit', auth, catchAsync(menuController.update))

router.post('/create', auth, catchAsync(menuController.create));

router.delete('/:menuID', auth, catchAsync(menuController.delete))

router.post('/addMeal', auth, catchAsync(menuController.addMeal))

router.get('/', auth, menuController.getAll)
