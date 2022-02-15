const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const ingredientSchama = new Schema({
    name: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

module.exports = mongoose.model('Ingredient', ingredientSchama);