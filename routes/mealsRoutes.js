const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

router.get('/:mealID', auth, catchAsync(mealController.getMeal));

router.put('/:mealID/edit', auth, catchAsync(mealController.editMeal));

router.post('/:mealID/favourite', auth, catchAsync(mealController.favourite));

router.post('/create', catchAsync(mealController.createMeal));

router.delete('/:mealID', auth, catchAsync(mealController.deleteMeal));

router.get('/', auth, catchAsync( mealController.getAll));

// router.put('/favourite', auth, catchAsync( mealController.favourite));
