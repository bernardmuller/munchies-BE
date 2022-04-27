const Meal = require('../models/meal');
const User = require('../models/User');
const Menu = require('../models/menu');
const Item = require('../models/item');
const GroceryList = require('../models/groceryList');
const MenuService = require('../services/menuService')
const AppError = require('../utils/AppError');
const menuService = new MenuService;

module.exports = class menuController {
    constructor() {};

    create = async function(req, res) {
        try {
            const user = await User.findById(res.locals.user);
        
            const new_menu = await menuService.create(user.id)

            res.status(200).send(new_menu);
        } catch (error) {
            console.log(error);
        };
    };

    getAll = async function(req, res) {
        try {
            const menus = await menuService.getAll(res.locals.user)

            return res.status(200).send(menus)  
        } catch (error) {
            console.log(error);
        };
    };

    get = async function(req, res) {
        try {
            let menu = {
                id: req.params.id
            };
    
            for (const item of menu) {
                if(item = undefined) res.status(400).send({ message : `${item} is required`})
            };
            
            const response = await menuService.get(menu)
    
            res.status(200).send(response); 
        } catch (error) {
            console.log(error);
        };
    };

    update = async function(req, res) {
        try {
            let menu = {
                id: req.params.id
            };
    
            for (const item of menu) {
                if(item = undefined) res.status(400).send({ message : `${item} is required`})
            };
            
            const response = await menuService.get(menu)
    
            res.status(200).send(response); 
        } catch (error) {
            console.log(error);
        };
    };

    mealsList = async function(req, res) {
        try {

            let menu = await Menu.findById(req.params.id);

            if (!menu) return res.status(400).send({
                message: "menu not found"
            })
            
            let grocerylist = await GroceryList.findById(menu.grocerylist._id)
            
            if (!grocerylist) return res.status(400).send({
                message: "grocerylist not found"
            })

            const user = await User.findById(res.locals.user);

            let newMeals = [];
            for(const meal of req.body.meals) {
                const dbmeal = await Meal.findById(meal.id);
                if(!dbmeal) return res.status(400).send({
                    message: `meal "${meal.id}" not found`
                });
                // newMeals.push({ "_id" : meal.id });
                newMeals = [...newMeals, dbmeal];
                // menu.meals.push(meal)
            }

            let groceryItems = [];
            for(const meal of newMeals) {
                const dbmeal = await Meal.findById(meal.id)
                .populate({
                    path: 'ingredients',
                    model: 'Ingredient',
                });
                
                for(const ingredient of dbmeal.ingredients) {
                    let newItem = new Item(
                        {
                            item_type: 1,
                            ingredient_id: ingredient._id,
                            createdBy : user._id,
                        }
                    );

                    groceryItems = [...groceryItems, newItem];
                    await newItem.save();
                }
            };

            grocerylist.meal_items = groceryItems;
            menu.meals = newMeals;
            menu.updatedBy = res.locals.user;

            await grocerylist.save()
            await menu.save()

            console.log(menu)

            // const response = await menuService.mealslist(menu)
    
            res.status(200).send(menu); 
        } catch (error) {
            console.log(error);
        };
    };

    delete = async function(req, res) {
        try {
            const user = await User.findById(res.locals.user);
            console.log(user)
            const menu = await Menu.findById(req.params.id);
            if(menu === null) res.status(401).send({ message : "Menu not found" });
            // if(user._id !== menu.createdBy) {
            //     res.status(401).send({ message : "You are not the creator of this menu." });
            // };
            Menu.deleteOne({ _id: req.params.id }, function(err) {
                if (!err) {
                    res.status(200).send({ message : "Menu deleted" });
                }
                else {
                    res.status(500).send({ message : "error" });
                }
            });

            return res.send({ message: 'menu deleted'})
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    }
    
}



//meals
module.exports.mealsList = async(req, res) => {
    try {
        let menu = await Menu.findById(req.params.id);
        let grocerylist = await GroceryList.findById(menu.grocerylist._id)
        const user = await User.findById(res.locals.user);

        let newMeals = [];
        req.body.meals.forEach(meal => {
            newMeals.push({ "_id" : meal.id })
            // menu.meals.push(meal)
        });
        console.log(newMeals)
        menu.meals = newMeals;
        
        const process = () => {
            let groceryItems = [];

            // for of loop here,, delete function
            // forEach loops dont work with async functions
            req.body.meals.forEach(async(meal) => {
    
                let dbmeal = await Meal.findById(meal.id)
                .populate({
                    path: 'ingredients',
                    model: 'Ingredient',
                })
    
                dbmeal.ingredients.forEach(async(item) => {
    
                    let newItem = new Item(
                        {
                            ingredient_id: item._id,
                            createdBy : user._id,
                        }
                    );
                    // console.log(newItem)
                    groceryItems.push(newItem._id);
                    // await newItem.save();
                })
                // console.log("3. " , groceryItems)
                grocerylist.meal_items = groceryItems;
                // console.log(grocerylist)
                // console.log("menu: " , menu)
            })
            // console.log("2. ", groceryItems)
        }
        
        menu.updatedBy = res.locals.user;
        

        // console.log("1. ", groceryItems)

        // await grocerylist.save();
        // await menu.save();
    
        res.status(200).send({ message : "meals updated", menu: menu });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }

    
};  

// //edit menu
// module.exports.update = async(req, res) => {
//     const user = await User.findById(res.locals.user);

//     try {
//         const updatedMenu = await Menu.findByIdAndUpdate(
//             req.params.id, 
//             {
//                 ...req.body,
//                 updatedBy: user._id
//             }, 
//             {
//                 runValidators: true, 
//                 new: true, 
//                 useFindAndModify:false
//             }
//         );
    
//         await updatedMenu.save();
    
//         res.status(200).send({ message : "menu updated", menu: updatedMenu });
        
//     } catch (error) {
//         throw new AppError(error.errors.name.message, 400)
//     }
// }

// //delete menu
// module.exports.delete = async(req, res) => {
//     try {
//         const user = await User.findById(res.locals.user);
//         console.log(user)
//         const menu = await Menu.findById(req.params.id);
//         if(menu === null) res.status(401).send({ message : "Menu not found" });
//         // if(user._id !== menu.createdBy) {
//         //     res.status(401).send({ message : "You are not the creator of this menu." });
//         // };
//         Menu.deleteOne({ _id: req.params.id }, function(err) {
//             if (!err) {
//                 res.status(200).send({ message : "Menu deleted" });
//             }
//             else {
//                 res.status(500).send({ message : "error" });
//             }
//         });

//     } catch (error) {
//         console.log(error)
//     }
// }
