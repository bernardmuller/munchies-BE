const Ingredient = require('../models/ingredient');
const User = require('../models/User');
const AppError = require('../utils/AppError')

module.exports.getAll = async(req, res) => {
    const ingredients = await Ingredient.find({})
    .select('_id name')
    res.status(200).send(ingredients);
};

module.exports.get = async(req, res) => {
    const ingredient = await Ingredient.findById(req.params.id)
    .select('_id name')
    res.status(200).send(ingredient);
};

module.exports.create = async(req, res) => {
    if(!req.body.name) res.status(400).send({ message : "No ingredient name provided"});
    try {
        const user = await User.findById(res.locals.user);
        const newIngredient = await Ingredient.create({name: req.body.name, createdBy : user._id });
        res.status(200).send({ message : "Ingredient updated", ingredient: newIngredient });
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

module.exports.update = async(req, res) => {
    try {
        const user = await User.findById(res.locals.user);
        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                updatedBy: user._id
            }
        );
        await updatedIngredient.save();
    
        res.status(200).send({ message : "Ingredient updated", ingredient: updatedIngredient });
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

module.exports.delete = async(req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message : "Ingredient Deleted"});
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};
