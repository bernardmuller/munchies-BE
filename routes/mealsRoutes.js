const express = require('express');
const router = express.Router();
const Meal = require('../models/meal')

router.get('/', async(req, res) => {
    const meals = await Meal.find({})    
    res.send(meals);
});

module.exports = router;