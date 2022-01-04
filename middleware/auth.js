const jwt = require('jsonwebtoken');

module.exports.auth = async(req, res, next) => {
    const { token } = req.body;
    
    if(!token) {
        res.status(401).json({auth: false, message: 'No token found'});
        return;
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
