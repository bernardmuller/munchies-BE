const express = require('express');
const router = express.Router();
const Meal = require('../models/meal')
const mealController = require('../controllers/mealController');

module.exports = router;

// get all meals
router.get('/', mealController.getAll)
// get meal

// create meal
router.post('/create', mealController.createMeal);

// update meal
// delete meal
