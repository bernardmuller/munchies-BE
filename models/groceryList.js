const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groceryListSchema = new Schema ({
    menu_id: {
        type: String,
        required: true,
    },
    meal_items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    extra_items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
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

module.exports = mongoose.model("GroceryList", groceryListSchema);

