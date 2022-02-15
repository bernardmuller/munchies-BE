const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

module.exports.auth = async(req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if(typeof header === 'undefined') throw new AppError("Unauthorized", 403);
        
        const bearer = header.split(' ');
        const token = bearer[1];
    
        req.token = token;
    
        await jwt.verify(token, `${process.env.JWT_SECRET}`, async(err, decodedtoken) => {
            if(err) res.status(401).json({auth: false, message: err.message});
            // const user = await User.findById(decodedtoken.id);
            res.locals.user = decodedtoken.id;
        });
    
        next();
        
    } catch (error) {
        res.status(401).json({auth: false, message: error});
    }
};
