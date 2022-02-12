const Meal = require('../models/meal');
const User = require('../models/User');
const Menu = require('../models/menu');

//getUser
//updateUser
//getAllusers
//change role
//isAdmin
//changeRole - requires my token
//deleteUser

module.exports.get = async(req, res) => {
    const user = await User.findById(req.params.id)
    .select('-password -__v');
    res.status(200).send(user);
};

module.exports.update = async(req, res) => {
    const currentUser = res.locals.user;
    const user = await User.findById(req.params.id);

    if(user._id !== currentUser) res.status(400).send({ message: "not allowed"});

    await User.findByIdAndUpdate(
        req.params.id, 
        {
            ...req.body,
            updatedBy: user._id
        }, 
    )
    res.status(200).send({ message: "user updated"});
};

module.exports.getAll = async(req, res) => {
    
    
};

module.exports.changeRole = async(req, res) => {
    
    
};

module.exports.delete = async(req, res) => {
    
    
};