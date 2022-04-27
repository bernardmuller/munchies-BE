const GroceryList = require('../models/groceryList');

module.exports = class grocerylistService {
    constructor() {};

    create = async function(params)  {
        return new Promise(async(resolve, reject) => {
            try {
                const newGroceryList = new GroceryList(params)
                await newGroceryList.save();
                
                return resolve(newGroceryList);
            } catch (error) {
                return reject(error);
            };
        });
    };

    get = async function(params)  {
        return new Promise(async(resolve, reject) => {
            try {
                
                const grocerylist = await GroceryList.findById(params)
                // .select('id meal_items')
                .populate({
                    path: 'meal_items',
                    select: 'id name check',
                })

                return resolve(grocerylist);
            } catch (error) {
                return reject(error);
            };
        });
    };

    getAll = async function(params)  {
        return new Promise(async(resolve, reject) => {
            try {
                
                const grocerylists = await GroceryList.find({})
                .populate({
                    path: 'meal_items',
                    select: 'id name',
                    populate: {
                        path: 'ingredients',
                        model: 'Ingredient',
                        select: 'id name check',
                    }
                })

                return resolve(grocerylists);
            } catch (error) {
                return reject(error);
            };
        });
    };
}