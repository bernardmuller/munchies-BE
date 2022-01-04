const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

// get meal
router.get('/:mealID', auth, catchAsync(mealController.getMeal))

// update meal
router.put('/:mealID/edit', auth, catchAsync(mealController.editMeal))

// create meal
router.post('/create', auth, catchAsync(mealController.createMeal));

// delete meal
router.delete('/:mealID', auth, isCreator, catchAsync(mealController.deleteMeal))

// get all meals
router.get('/', auth, mealController.getAll)
