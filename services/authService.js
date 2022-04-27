const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AppError = require('../utils/AppError');

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
module.exports = class AuthService {
    constructor() {};

    createToken = function(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 3 * 24 * 60 * 60
        }) 
    };

    register = async function(user_data) {
        return new Promise(async(resolve, reject) => {
            try {
                const newUser = await User.create(user_data);
                const token = this.createToken(newUser._id);
                
                return resolve({newUser, token})
            } catch (error) {
                return reject(err)
            }
        })
    };
    
    login = async function(email, password) {
        return new Promise(async(resolve, reject) => {
            try {
                const user = await User.login(email, password);
                const token = this.createToken(user._id);

            return resolve({user, token});
            } catch (error) {
                return reject(error);
            };
        });
    };
    
    logout = async function() {
        return new Promise(async(req, res) => {
            try {
                res.cookie('token', `${process.env.JWT_SECRET}`, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1 });
                res.status(200).json()
                
            } catch (error) {
                return reject(error)
            }
        })
    };
    
    // rename endpoint
    auth = async(req, res) => {
        let currentUser = res.locals.currentUser;
        if(!currentUser) return res.status(401).json({auth: false, message: 'Unauthorized'});
        
        jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decodedtoken) => {
            if(err) return res.status(401).json({auth: false, message: err.message});
            res.status(200).json({auth: true, message: "Authorized"})
        });
    };
};