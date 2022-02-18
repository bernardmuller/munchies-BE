const Meal = require('../models/meal');
const User = require('../models/User');
const AppError = require('../utils/AppError')

module.exports.getAll = async(req, res) => {
    const meals = await Meal.find({ 'createdBy' : res.locals.user})
    .select('_id name season ingredients image favourite')
    res.status(200).send(meals);
};

module.exports.getMeal = async(req, res) => {
    const meal = await Meal.findById(req.params.mealID);
    res.status(200).send(meal);
};

module.exports.createMeal = async(req, res) => {
    const user = await User.findById(res.locals.user);
    try {
        const newMeal = await Meal.create({...req.body, createdBy : user._id });
        res.status(200).send({ message : "meal created", meal: newMeal });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

module.exports.editMeal = async(req, res) => {
    const { mealID } = req.params;
    const user = await User.findById(res.locals.user);

    try {
        const updatedMeal = await Meal.findByIdAndUpdate(
            mealID, 
            {
                ...req.body,
                updatedBy: user._id
            }, 
            {
                runValidators: true, 
                new: true, 
                useFindAndModify:false
            }
        );
    
        await updatedMeal.save();
    
        res.status(200).send({ message : "meal updated", meal: updatedMeal });
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

module.exports.deleteMeal = async(req, res) => {
    const user = await User.findById(res.locals.user);
    const meal = await Meal.findById(req.params.mealID);
    if(user.id !== meal.createdBy) {
        res.status(401).send({ message : "You are not the creator of this meal." });
    };
    await meal.findByIdAndDelete(req.params.mealID);
};

module.exports.favourite = async(req, res) => {
    const user = await User.findById(res.locals.user);
    const meal = await Meal.findById(req.params.mealID);

    if(user._id !== meal.createdBy) {
        res.status(401).send({ message : "You are not the creator of this meal." });
    };
    const updatedMeal = await Meal.findByIdAndUpdate(
        req.params.mealID, 
        {
            favourite: req.body.favourite,
            updatedBy: user._id
        }, 
        {
            runValidators: true, 
            new: true, 
            useFindAndModify:false
        }
    )
    .select('id name favourite');
    res.status(401).send({ message : "Success" , updatedMeal});
};

module.exports.add = async(req, res) => {
    try {
        const meal_id = req.params.id;
        const { ingredient_id } = req.body;
        let user = res.locals.user;
        
        if(!ingredient_id || ingredient_id === "" || ingredient_id === undefined) {
            throw new AppError("No ingredient to add", 400);
        };

        let meal = await Meal.findById(meal_id);

        meal.ingredients.push(ingredient_id);
        
        meal.updatedBy = user;

        await meal.save();
    
        res.status(200).send({ message : "Ingredient added to meal", meal: meal });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    };
};

module.exports.remove = async(req, res) => {
    try {
        const meal_id = req.params.id;
        const { ingredient_id } = req.body;
        let user = res.locals.user;
        
        if(!ingredient_id || ingredient_id === "" || ingredient_id === undefined) {
            throw new AppError("No ingredient provided", 400);
        };

        let meal = await Meal.findById(meal_id);

        meal.ingredients = meal.ingredients.filter(function(item, index, arr) { 
            return item != ingredient_id;
        });

        meal.updatedBy = user;

        await meal.save();
    
        res.status(200).send({ message : "Ingredient removed from meal", meal: meal });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    };
};