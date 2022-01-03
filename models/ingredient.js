const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

const ingredientSchama = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchama);