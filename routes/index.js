const { authRoutes } = require('./authRoutes');
const { userRoutes } = require('./userRoutes');
const { menuRoutes } = require('./menuRoutes');
const { mealsRoutes } = require('./mealsRoutes');
const { ingredientRoutes } = require('./ingredientRoutes');
const { grocerylistRoutes } = require('./grocerylistRoutes');
const { itemRoutes } = require('./itemRoutes');

const ROUTES = {
    ...authRoutes,
    ...userRoutes,
    ...menuRoutes,
    ...mealsRoutes,
    ...ingredientRoutes,
    ...grocerylistRoutes,
    ...itemRoutes
};

module.exports = ROUTES;