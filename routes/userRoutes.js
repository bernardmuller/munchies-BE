const userController = require('../controllers/userController');
const catchAsync = require('../middleware/catchAsync')

module.exports.userRoutes = {
    getAllUsers : {
        method: 'GET',
        path: '/users',
        handler: catchAsync(userController.getAll),
        auth: true
    },
    getUser : {
        method: 'GET',
        path: '/users/:id',
        handler: catchAsync(userController.get),
        auth: true
    },
    updateUser : {
        method: 'PUT',
        path: '/users/:id',
        handler: catchAsync(userController.edit),
        auth: true
    },
    deleteUser : {
        method: 'DELETE',
        path: '/users/:id',
        handler: catchAsync(userController.delete),
        auth: true
    },
    changeUserRole : {
        method: 'PUT',
        path: '/users/:id/changeRole',
        handler: catchAsync(userController.changeRole),
        auth: true
    }
};