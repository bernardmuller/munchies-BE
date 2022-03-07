const menuController = require('../controllers/menuController');
const catchAsync = require('../middleware/catchAsync')

module.exports.menuRoutes = {
    getAllMenus : {
        method: 'GET',
        path: '/menus',
        handler: catchAsync(menuController.getAll),
        auth: true
    },
    getMenu : {
        method: 'GET',
        path: '/menus/:id',
        handler: catchAsync(menuController.get),
        auth: true
    },
    createMenu : {
        method: 'POST',
        path: '/menus',
        handler: catchAsync(menuController.create),
        auth: true
    },
    updateMenu : {
        method: 'PUT',
        path: '/menus/:id',
        handler: catchAsync(menuController.update),
        auth: true
    },
    deleteMenu : {
        method: 'DELETE',
        path: '/menus/:id',
        handler: catchAsync(menuController.delete),
        auth: true
    },
    mealsList : {
        method: 'POST',
        path: '/menus/:id/meals',
        handler: catchAsync(menuController.mealsList),
        auth: true
    },
    removeMealfromMenu : {
        method: 'POST',
        path: '/menus/:id/removeMeal',
        handler: catchAsync(menuController.removeMeal),
        auth: true
    }
};