const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
	{
		ingredient: {
			type: Schema.Types.ObjectId,
			ref: "Ingredient",
		},
		check: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		updatedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
