const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema ({
    name: {

        type: String, 
        default: "Untitled Meal"

    },
    seasons: [
        String
    ],
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
    prep_time: {
        type: Number,
        min: 0,
    },
    cook_time: {
        type: Number,
        min: 0,
    },
    ready_in: {
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
