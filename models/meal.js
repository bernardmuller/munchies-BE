const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Ingredient = require('./ingredient');
const Cuisine = require('./cuisine');


const mealSchema = new Schema ({
    name: {

        type: String, 
        default: "Untitled Meal"

    },
    season: {

        type: String,

    },
    directions: {

        type: String,

    },
    ingredients: [
        {
            name: String,
       }
    ],
    cuisine: {
        type: Schema.Types.ObjectId,
        ref: 'Cuisine'
    },
    favourite: Boolean,
    image: String,
    url: String,
    prepTime: Number,
    cookTime: Number,
    readyIn: Number,
    rating: {

        type: Number,
        min: 0,
        max: 5,
        default: 0,

    },
    notes: {

        type: String,
        maxlength: 200,
        
    },
    createdBy: {

        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    updatedBy: {

        type: Schema.Types.ObjectId,
        ref: 'User'

    },

}, {timestamps: true});

module.exports = mongoose.model("Meal", mealSchema);
