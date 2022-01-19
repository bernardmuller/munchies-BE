const Meal = require('../models/meal');
const User = require('../models/User');

module.exports.getAll = async(req, res) => {
    const meals = await Meal.find({});  
    res.send(meals);
};


module.exports.getMeal = async(req, res) => {
    const { mealID } = req.params;  
    const meal = await Meal.findById(mealID);
    res.status(200).send(meal);
};


module.exports.createMeal = async(req, res) => {
//     let data = res.locals.decodedToken;
//     const user = await User.findById(data.id);
//     createdBy : user._id }

    const newMeal = new Meal({...req.body});
    await newMeal.save();
    res.status(200).send({ message : "meal created", meal: newMeal });
};


module.exports.editMeal = async(req, res) => {
    const { mealID } = req.params; 
    let data = res.locals.decodedToken;
    const user = await User.findById(data.id);

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
};

module.exports.deleteMeal = async(req, res) => {
    let data = res.locals.decodedToken;
    const user = await User.findById(data.id);
    
    const { mealID } = req.params;
    const meal = await Meal.findById(mealID);

    if(user.id !== meal.createdBy) {
        res.status(401)
        .send(
            { 
                message : "You are not the creator of this meal.", 
            }
        );
    }
    
    await meal.findByIdAndDelete(mealID);
};
