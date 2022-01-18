const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

router.get('/:mealID', auth, catchAsync(mealController.getMeal))

router.put('/:mealID/edit', auth, catchAsync(mealController.editMeal))

router.post('/create', auth, catchAsync(mealController.createMeal));

router.delete('/:mealID', catchAsync(mealController.deleteMeal))

router.get('/', mealController.getAll)
