const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Meal = require('./meal')


const menuSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    timePeriod: {
        type: Date,
        min: String,
        max: String,
        required: [true, 'Please provide a start and end date for this menu']
    },
    meals: [

        {
            type: Schema.Types.ObjectId,
            ref: 'Meals'
        }
        
    ],
    createdBy: {

        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    updatedBy: {

        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    createdAt: {

        type: String,
        required: true

    },
    updatedAt: {

        type: String,
        required: true

    },
});

schema.pre('save', function(next) {

    let now = Date.now;
    if (!this.createdAt) this.createdAt = now;
    this.updatedAt = now;

    next();
});

module.exports = mongoose.model("Menu", menuSchema);

