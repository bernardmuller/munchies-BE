const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Meal = require('./meal')
const Ingredient = require('./ingredient')


const menuSchema = new Schema ({
    menu_id: {
        type: String,
        required: true,
    },
    meal_items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

menuSchema.pre('save', function(next) {

    let now = Date.now;
    if (!this.createdAt) this.createdAt = now;
    this.updatedAt = now;

    next();
});

module.exports = mongoose.model("Menu", menuSchema);

