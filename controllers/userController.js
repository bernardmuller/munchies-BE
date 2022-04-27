const User = require('../models/User');
const userService = require('../services/userService');

//getUser
//updateUser
//getAllusers
//change role
//isAdmin
//changeRole - requires my token
//deleteUser
module.exports = class userrController {
    constructor() {};

    get = async(req, res) => {
        try {

            const user = await userService.get(req.params.id); 
            
            return res.status(200).send(user);
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    update = async(req, res) => {
        try {
            const requestUser = await User.findById(req.params.id);

            if(requestUser._id != res.locals.user) res.status(400).send({ message: "not allowed"});

            let user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                bio: req.body.bio,
            };

            let currentUser =  await userService.get(req.params.id);

            for (const item in current_event) {
                if(user[item]) {
                    current_event[item] = user[item];
                };
            };

            const updatedUser = await userService.get(currentUser); 
            
            return res.status(200).send(updatedUser);
        } catch (error) {
            throw new AppError(error, 500);
        };
    };
};