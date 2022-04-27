const MealController = require('../controllers/mealController');
const catchAsync = require('../middleware/catchAsync');

const mealController = new MealController;

module.exports.mealsRoutes = {
    getAllMeals : {
        method: 'GET',
        path: '/meals',
        handler: catchAsync(mealController.getAll),
        auth: true
    },
    getMeal : {
        method: 'GET',
        path: '/meals/:id',
        handler: catchAsync(mealController.get),
        auth: true
    },
    createMeal : {
        method: 'POST',
        path: '/meals',
        handler: catchAsync(mealController.create),
        auth: true
    },
    updateMeal : {
        method: 'PUT',
        path: '/meals/:id',
        handler: catchAsync(mealController.update),
        auth: true
    },
    deleteMeal: {
        method: 'DELETE',
        path: '/meals/:id',
        handler: catchAsync(mealController.delete),
        auth: true
    },
    addIngredientToMeal : {
        method: 'POST',
        path: '/meals/:id/add',
        handler: catchAsync(mealController.add),
        auth: true
    },
    removeIngredientFromMeal : {
        method: 'POST',
        path: '/meals/:id/remove',
        handler: catchAsync(mealController.remove),
        auth: true
    },
    favouriteMeal : {
        method: 'POST',
        path: '/meals/:id/favourite',
        handler: catchAsync(mealController.favourite),
        auth: true
    }
};