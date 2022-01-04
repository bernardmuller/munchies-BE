const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

// get all meals
router.get('/', mealController.getAll)
// get meal

// create meal
router.post('/create', auth, catchAsync(mealController.createMeal));

// update meal
// delete meal
