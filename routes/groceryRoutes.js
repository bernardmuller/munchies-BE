const groceriesController = require('../controllers/groceriesController');
const catchAsync = require('../middleware/catchAsync')

module.exports.groceryRoutes = {
    getAllGroceryLists : {
        method: 'GET',
        path: '/grocerylists',
        handler: catchAsync(groceriesController.getAll),
        auth: true
    },
    getGroceryList : {
        method: 'GET',
        path: '/grocerylists/:id',
        handler: catchAsync(groceriesController.get),
        auth: true
    },
    createGroceryList : {
        method: 'POST',
        path: '/grocerylists',
        handler: catchAsync(groceriesController.createGroceryList),
        auth: true
    },
    updateGroceryList : {
        method: 'PUT',
        path: '/grocerylists/:id',
        handler: catchAsync(groceriesController.update),
        auth: true
    },
    deleteGroceryList : {
        method: 'DELETE',
        path: '/grocerylists/:id',
        handler: catchAsync(groceriesController.delete),
        auth: true
    },
};