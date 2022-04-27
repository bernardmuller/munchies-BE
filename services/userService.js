
const User = require('../models/User');
const Menu = require('../models/menu');
const Meal = require('../models/meal');

module.exports = class userService {
    constructor() {};

    get = async function(params)  {
        return new Promise(async(resolve, reject) => {
            try {
             
                let user = await User.findById(req.params.id)
                .select('-password -__v');
                let userMeals = await Meal.find({ 'createdBy' : user._id})
                user.meals = userMeals;

                let userMenus = await Menu.find({ 'createdBy': user._id})
                user.menus = userMenus;

                return resolve(user);
            } catch (error) {
                return reject(error);
            };
        });
    };

    update = async function(params)  {
        return new Promise(async(resolve, reject) => {
            try {
                
                const updatedUser = await User.findByIdAndUpdate(
                    params._id,
                    {
                        ...params,
                        updatedBy:params._id
                    }, 
                );

                return resolve(updatedUser);
            } catch (error) {
                return reject(error);
            };
        });
    };
}