const Meal = require('../models/meal');


module.exports.createMeal = async(req, res) => {
    const newMeal = new Meal(req.body.meal);
};


module.exports.getAll = async(req, res) => {
    const meals = await Meal.find({});  
    res.send(meals);
};


module.exports.createMeal = async(req, res) => {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(200).send({ message : "meal created" });
};