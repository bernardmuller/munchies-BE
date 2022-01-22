const Meal = require('../models/meal');
const User = require('../models/User');
const Menu = require('../models/menu');

//get menus
module.exports.getAll = async(req, res) => {
    const menus = await Menu.find({});
    res.status(200).send(menus);
};

//get menu
module.exports.getMenu = async(req, res) => {
    const { menuID } = req.params;  
    const menu = await Menu.findById(menuID);
    res.status(200).send(menu);
};

//create menu
module.exports.createMenu = async(req, res) => {
    let data = res.locals.decodedToken;
    const user = await User.findById(data.id);

    try {
        const newMenu = new Menu({...req.body, createdBy : user._id });
        await newMenu.save();
        res.status(200).send({ message : "menu created", meal: newMenu });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

//add meal
module.exports.addMeal = async(req, res) => {
    const { menuID, mealID } = req.body;
    let data = res.locals.decodedToken;
    const user = await User.findById(data.id);
    const meal = await Meal.findById(mealID);

    try {
        let menu = await Menu.findByIdAndUpdate(
            menuID, 
            {
                updatedBy: user._id
            }, 
            {
                runValidators: true, 
                new: true, 
                useFindAndModify:false
            }
        );
        menu.meals.push(meal)
    
        await menu.save();
    
        res.status(200).send({ message : "meal added to menu", menu: menu });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
}   

//remove meal
//edit menu
module.exports.editMenu = async(req, res) => {

}

//gnerate ingredients list
//delete menu