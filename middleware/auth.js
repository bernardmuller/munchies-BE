const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')
const User = require('../models/User');

module.exports.auth = async(req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if(typeof header === 'undefined') throw new AppError("Unauthorized", 403);
        
        const bearer = header.split(' ');
        const token = bearer[1];
    
        req.token = token;
    
        jwt.verify(token, 'KEEjnjd3bYEMqak6B6YkcsP4BuB6XA', async(err, decodedtoken) => {
            if(err) res.status(401).json({auth: false, message: err.message});
            // const user = await User.findById(decodedtoken.id);
            res.locals.user = decodedtoken.id;
        });
    
        next();
        
    } catch (error) {
        res.status(401).json({auth: false, message: error});
    }
};
