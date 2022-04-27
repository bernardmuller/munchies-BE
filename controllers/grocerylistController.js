const User = require('../models/User');
const Menu = require('../models/menu');
const Item = require('../models/item');
const Ingredient = require('../models/ingredient');
const GroceryList = require('../models/groceryList');
const AppError = require('../utils/AppError')
const GrocerylistService = require('../services/grocerylistService')

const grocerylistService = new GrocerylistService;

module.exports = class GrocerylistController {
    constructor() {}

    create = async(req, res) => {
        try {
            if(!req.body.menu_id || req.body.menu_id === undefined) {
                res.status(400).send({ message : "no menu provided"});
            };

            const menu = await Menu.findById(req.body.menu_id)
            const user = await User.findById(res.locals.user);

            let grocerylist = {
                menu_id: req.body.menu_id, 
                meal_items: menu.meals,
                createdBy : user._id 
            };

            const newGrocerylist = await grocerylistService.create(grocerylist)

            res.status(200).send(newGrocerylist);
        } catch (error) {
            throw new AppError(error, 500)
        }
    };

    get = async(req, res) => {
        try {

            const grocerylist = await grocerylistService.get(req.params.id); 
            console.log(grocerylist)
            return res.status(200).send(grocerylist);
        } catch (error) {
            console.log(error)
            throw new AppError(error, 500);
        };
    };

    getAll = async(req, res) => {
        try {

            const grocerylists = await grocerylistService.getAll(); 
            
            return res.status(200).send(grocerylists);
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    addExtraItem = async function(req, res) {
        try {

            const user = await User.findById(res.locals.user);

            let item = {
                ingredient_id: req.body.ingredient_id,
            };

            for(const i in item) {
                if(i == undefined) return res.status(401).send({ message: `${item} is required`})
            };

            const db_ingredient = await Ingredient.findById(item.ingredient_id)
            if(db_ingredient == undefined) return res.status(400).send({ message : "ingredient not found"})

            let newItem = new Item(
                {
                    item_type: 1,
                    ingredient_id: db_ingredient._id,
                    createdBy : user._id,
                }
            );
            await newItem.save();
            
            let grocerylist = await GroceryList.findById(req.params.id);
            if(!grocerylist) return res.status(400).send({ message: 'grocerylist not found'})
            
            grocerylist.extra_items = [...grocerylist.extra_items, newItem]

            return res.status(200).send(grocerylist)
        } catch (error) {
            console.log(error);
        };
    }
};

//addExtraItems
// module.exports.addExtraItems = async(req, res) => {
//     res.send('works')
// };

