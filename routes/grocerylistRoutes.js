const GrocerylistController = require('../controllers/grocerylistController');
const catchAsync = require('../middleware/catchAsync')

const grocerylistController = new GrocerylistController;

module.exports.grocerylistRoutes = {
    getAllGroceryLists : {
        method: 'GET',
        path: '/grocerylists',
        handler: catchAsync(grocerylistController.getAll),
        auth: true
    },
    getGroceryList : {
        method: 'GET',
        path: '/grocerylists/:id',
        handler: catchAsync(grocerylistController.get),
        auth: true
    },
    createGroceryList : {
        method: 'POST',
        path: '/grocerylists',
        handler: catchAsync(grocerylistController.create),
        auth: true
    },
    updateGroceryList : {
        method: 'PUT',
        path: '/grocerylists/:id',
        handler: catchAsync(grocerylistController.update),
        auth: true
    },
    deleteGroceryList : {
        method: 'DELETE',
        path: '/grocerylists/:id',
        handler: catchAsync(grocerylistController.delete),
        auth: true
    },
    checkItem : {
        method: 'POST',
        path: '/grocerylists/:id/check',
        handler: catchAsync(grocerylistController.checkItem),
        auth: true
    },
    addExtraItem: {
        method: 'POST',
        path: '/grocerylists/:id/addItem',
        handler: catchAsync(grocerylistController.addExtraItem),
        auth: true
    }
};