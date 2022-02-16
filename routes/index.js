const { authRoutes } = require('./authRoutes');
const { userRoutes } = require('./userRoutes');
const { menuRoutes } = require('./menuRoutes');
const { mealsRoutes } = require('./mealsRoutes');
const { ingredientRoutes } = require('./ingredientRoutes');

const ROUTES = {
    ...authRoutes,
    ...userRoutes,
    ...menuRoutes,
    ...mealsRoutes,
    ...ingredientRoutes,
};

module.exports = ROUTES;