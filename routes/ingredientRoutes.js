const IngredientController = require('../controllers/ingredientController');
const catchAsync = require('../middleware/catchAsync');

const ingredientController = new IngredientController;

module.exports.ingredientRoutes = {
    getAllIngredients : {
        method: 'GET',
        path: '/ingredients',
        handler: catchAsync(ingredientController.getAll),
        auth: true
    },
    getIngredient : {
        method: 'GET',
        path: '/ingredients/:id',
        handler: catchAsync(ingredientController.get),
        auth: true
    },
    createIngredient : {
        method: 'POST',
        path: '/ingredients',
        handler: catchAsync(ingredientController.create),
        auth: true
    },
    updateIngredient : {
        method: 'PUT',
        path: '/ingredients/:id',
        handler: catchAsync(ingredientController.update),
        auth: true
    },
    deleteIngredient : {
        method: 'DELETE',
        path: '/ingredients/:id',
        handler: catchAsync(ingredientController.delete),
        auth: true
    },
};