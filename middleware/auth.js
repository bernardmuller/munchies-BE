const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')

module.exports.auth = (req, res, next) => {
    const { token } = req.body;
    
    if(!token) {
        throw new AppError("No token found", 401)
    };

    jwt.verify(token, 'KEEjnjd3bYEMqak6B6YkcsP4BuB6XA', (err, decodedtoken) => {
        if(err) {
            res.status(401).json({auth: false, message: err.message});
        } else {
            res.locals.decodedToken = decodedtoken;
            next();
        };
    });
};
