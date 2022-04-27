const ItemController = require('../controllers/itemController');
const catchAsync = require('../middleware/catchAsync')

const itemController = new ItemController;

module.exports.itemRoutes = {
    getAllItems : {
        method: 'GET',
        path: '/items',
        handler: catchAsync(itemController.getAll),
        auth: true
    },
    getItem : {
        method: 'GET',
        path: '/items/:id',
        handler: catchAsync(itemController.get),
        auth: true
    },
    createItem : {
        method: 'POST',
        path: '/items',
        handler: catchAsync(itemController.create),
        auth: true
    },
    updateItem : {
        method: 'PUT',
        path: '/items/:id',
        handler: catchAsync(itemController.update),
        auth: true
    },
    checkItem : {
        method: 'PUT',
        path: '/items/:id/check',
        handler: catchAsync(itemController.check),
        auth: true
    },
    unCheckItem : {
        method: 'PUT',
        path: '/items/:id/uncheck',
        handler: catchAsync(itemController.unCheck),
        auth: true
    },
    deleteItem : {
        method: 'DELETE',
        path: '/items/:id',
        handler: catchAsync(itemController.delete),
        auth: true
    }
};