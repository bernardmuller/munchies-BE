const GroceryList = require('../models/groceryList');
const User = require('../models/User');
const Menu = require('../models/menu');
const AppError = require('../utils/AppError')
const Meal = require('../models/meal');

//createList
module.exports.createGroceryList = async(req, res) => {
    if(!req.body.menu_id || req.body.menu_id === undefined) {
        res.status(400).send({ message : "no menu provided"});
    } else {
        try {
            let data = res.locals.user;
            const user = await User.findById(data);
            console.log(user)
            const menu = await Menu.findById(req.body.menu_id)
            .catch(error => {res.status(400).send({ message : error.message});});

            const newGroceyList = new GroceryList(
                {
                    menu_id: req.body.menu_id, 
                    meal_items: menu.meals,
                    createdBy : user._id 
                }
            )
            // .populate({
            //     path: 'menu_id',
            //     model: 'Menu',
            // });
            await newGroceyList.save();
            res.status(200).send({ message : "grocerylist created", grocerylist: newGroceyList });
            
        } catch (error) {
            throw new AppError(error.errors.name.message, 400)
        };
    };
};

//editList
module.exports.edit = async(req, res) => {
    res.send('works')
}

//deleteList
module.exports.delete = async(req, res) => {
    res.send('works')
}

//getList
module.exports.get = async(req, res) => {
    const groceryList = await GroceryList.findById(req.params.id)
    // .select('id meal_items')
    .populate({
        path: 'meal_items',
        select: 'id name',
        populate: {
            path: 'ingredients',
            model: 'Ingredient',
            select: 'id name',
        }
    })
    res.status(200).send(groceryList);
}
//getAll
module.exports.getAll = async(req, res) => {
    const grocerylists = await GroceryList.find({})
    .populate({
        path: 'meal_items',
        select: 'id name',
        populate: {
            path: 'ingredients',
            model: 'Ingredient',
            select: 'id name',
        }
    })
    res.status(200).send(grocerylists);
}
//addMealItems
module.exports.addMealItems = async(req, res) => {
    res.send('works')
}
//addExtraItems
module.exports.addExtraItems = async(req, res) => {
    res.send('works')
}