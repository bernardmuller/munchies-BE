const { authRoutes } = require('./authRoutes');
const { userRoutes } = require('./userRoutes');
const { menuRoutes } = require('./menuRoutes');
const { mealsRoutes } = require('./mealsRoutes');
const { ingredientRoutes } = require('./ingredientRoutes');
const { groceryRoutes } = require('./groceryRoutes');

const ROUTES = {
    ...authRoutes,
    ...userRoutes,
    ...menuRoutes,
    ...mealsRoutes,
    ...ingredientRoutes,
    ...groceryRoutes
};

module.exports = ROUTES;