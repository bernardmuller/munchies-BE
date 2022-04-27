const Ingredient = require('../models/ingredient');
const User = require('../models/User');
const ingredientService = require('../services/ingredientService');
const AppError = require('../utils/AppError')

module.exports = class ingredientController {
    constructor() {};

    getAll = async function(req, res) {
        try {
            const ingredient = await ingredientService.getAll();
            
            res.status(200).send(ingredient);
        } catch (error) {
            throw new AppError(error, 500)
        };
    };
    
    get = async function(req, res) {
        try {
            const ingredient = await ingredientService.get(req.params.id)
            
            res.status(200).send(ingredient);
        } catch (error) {
            throw new AppError(error, 500)
        };
    };
    
    create = async function(req, res) {
        if(!req.body.name) res.status(400).send({ message : "No ingredient name provided"});
        try {
            let ingredient = {
                name: req.body.name
            };
    
            for(const item in ingredient) {
                if(ingredient == undefined) return res.status(400).send({ message: `${item} is required`})
            };
    
            const user = await User.findById(res.locals.user);
    
            ingredient.createdBy = user._id;
    
            const newIngredient = await ingredientService.create(ingredient);
            
            res.status(200).send({ message : "Ingredient updated", ingredient: newIngredient });
        } catch (error) {
            throw new AppError(error.errors.name.message, 400)
        }
    };
    
    update = async function(req, res) {
        try {
            const user = await User.findById(res.locals.user);

            let ingredient = {
                name: req.body.name,
                updatedBy: user._id
            };

            for(const item in ingredient) {
                if(ingredient == undefined) return res.status(400).send({ message: `${item} is required`})
            };

            const updatedIngredient = ingredientService.update(ingredient);
        
            res.status(200).send({ message : "Ingredient updated", ingredient: updatedIngredient });
            
        } catch (error) {
            throw new AppError(error.errors.name.message, 400)
        }
    };
    
    delete = async function(req, res) {
        try {

            const ingredient = await Ingredient.findById(req.params.id);

            if(!ingredient) return res.status(400).send({ message: 'ingredient not found' });

            await ingredientService.delete(ingredient._id);
            
            res.status(200).send({ message : "Ingredient Deleted"});
        } catch (error) {
            throw new AppError(error.errors.name.message, 400)
        }
    };
};
