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
    directions: [
        String
    ],
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        }
    ],
    cuisine: {
        type: Schema.Types.ObjectId,
        ref: 'Cuisine'
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    image: String,
    url: String,
    prepTime: {
        type: Number,
        min: 0,
    },
    cookTime: {
        type: Number,
        min: 0,
    },
    readyIn: {
        type: Number,
        min: 0,
    },
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
