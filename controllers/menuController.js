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
    try {
        const { menuID } = req.params;  
        const menu = await Menu.findById(menuID)
        .populate({
            path: 'meals',
            model: 'Meal'
        });
        res.status(200).send(menu);
        
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
        
    }
};

//create menu
module.exports.createMenu = async(req, res) => {
    let data = res.locals.decodedToken;
    const user = await User.findById(data.id);

    try {
        const newMenu = new Menu({"name": "Untitled Menu", createdBy : user._id });
        await newMenu.save();
        res.status(200).send({ message : "menu created", meal: newMenu });
    } catch (error) {
        throw new AppError(error.errors.name.message, 400)
    }
};

//add meal
module.exports.addMeal = async(req, res) => {
    try {
        const { menu_id, meals } = req.body;
        let currentUser = res.locals.user;
        if(!meals) throw new AppError("No meal/s to add", 400);

        let menu = await Menu.findById(menu_id);
        meals.forEach(meal => {
            menu.meals.push(meal.id)
        })
        menu.updatedBy = currentUser;

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