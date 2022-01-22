const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const SECRET = process.env.SECRET;
const AppError = require('../utils/AppError')


// handle errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    }

    //Incorrect email
    if(err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    // incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'Password incorrect'
    }

    //duplicate error
    if(err.code === 11000) {
        errors.email = 'An account with that email already exists.';
        return errors;
    };

    //validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    };

    
    return errors;
};

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, `KEEjnjd3bYEMqak6B6YkcsP4BuB6XA`, {
        expiresIn: maxAge
    }) 
};


module.exports.register = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        
        const newUser = await User.create({ email, password });
        const token = createToken(newUser._id);
        
        res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: newUser._id, token: token});
        
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ errors })
    }
    
};


module.exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user, token })
    } catch (error) {
        const errors = handleError(error)
        console.log(errors)
        res.status(400).json({ errors });
    }
};


module.exports.logout = async(req, res) => {
    try {
        res.cookie('token', '', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1 });
        res.status(200).json()
    } catch (error) {
        console.log(error)
        res.status(400).json({ errors });
    }
};


module.exports.auth = async(req, res) => {
    let currentUser = res.locals.currentUser;
    if(!currentUser) return res.status(401).json({auth: false, message: 'Unauthorized'});
    
    jwt.verify(token, 'KEEjnjd3bYEMqak6B6YkcsP4BuB6XA', (err, decodedtoken) => {
        if(err) return res.status(401).json({auth: false, message: err.message});
        res.status(200).json({auth: true, message: "Authorized"})
    });
};