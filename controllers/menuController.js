const Meal = require('../models/meal');
const User = require('../models/User');
const Menu = require('../models/menu');
const GroceryList = require('../models/groceryList');

//get menus
module.exports.getAll = async(req, res) => {
    
    const menus = await Menu.find({})
    res.status(200).send(menus);
};

//get menu
module.exports.get = async(req, res) => {
    try {
        const { id } = req.params;  
        const menu = await Menu.findById(id)
        .populate({
            path: 'meals',
            model: 'Meal',
            select: '_id name favourite'
        })
        .populate({
            path: 'createdBy',
            model: 'User',
            select: '_id firstname'
        })
        .populate({ 
            path: 'grocerylist',
            model: 'GroceryList',
            select: '_id meal_items extra_items',
            populate: {
                path: 'meal_items',
                model: 'Meal',
                select: 'id name ingredients',
                populate: {
                    path: 'ingredients',
                    model: 'Ingredient',
                    select: 'id name',
                }
            }
        })
        res.status(200).send(menu);
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
        
    }
};

//create menu
module.exports.create = async(req, res) => {
    const user = await User.findById(res.locals.user);
    
    try {
        let newMenu = new Menu(
            {
                name: "Untitled Menu", 
                createdBy : user._id,
            }
        );
        const newGroceyList = new GroceryList(
            {
                menu_id: newMenu._id, 
                meal_items: newMenu.meals,
                createdBy : user._id 
            }
        )
        newMenu.grocerylist = newGroceyList._id;

        await newGroceyList.save();
        await newMenu.save();

        res.status(200).send({ message : "menu created", meal: newMenu });
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

//meals
module.exports.mealsList = async(req, res) => {
    try {
        if(!req.body.meals) throw new AppError("No meal/s to add", 400);

        let menu = await Menu.findById(req.params.id);
        let grocerylist = await GroceryList.findById(menu.grocerylist)

        let newMeals = [];
        let groceryItems = [];
        req.body.meals.forEach(meal => {
            newMeals.push(meal.id)
            groceryItems.push(meal.id)
        })
        console.log(newMeals)
        console.log(groceryItems)
        menu.meals = newMeals;
        grocerylist.meal_items = groceryItems;
        menu.updatedBy = res.locals.user;

        await grocerylist.save();
        await menu.save();
    
        res.status(200).send({ message : "meals updated", menu: menu });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};  

//edit menu
module.exports.update = async(req, res) => {
    const user = await User.findById(res.locals.user);

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id, 
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
    
        await updatedMenu.save();
    
        res.status(200).send({ message : "menu updated", menu: updatedMenu });
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
}

//delete menu
module.exports.delete = async(req, res) => {
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

    } catch (error) {
        console.log(error)
    }
}

