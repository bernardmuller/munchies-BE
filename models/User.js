const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const axios = require('axios');
const Menu = require('../models/menu');

const userSchema = Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    firstname: {
        type: String,
        default: "user"
    },
    lastname: {
        type: String,
    },
    bio: {
        type: String,
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    menus : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ],
    meals : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        }
    ]
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email })

    if(!user) {
        throw Error('incorrect email');
    };

    const auth = await bcrypt.compare(password, user.password);
    if(!auth) {
        throw Error('incorrect password');    
    };
    return user._id;
};

module.exports = mongoose.model('User', userSchema);