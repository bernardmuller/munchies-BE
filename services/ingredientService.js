const Ingredient = require("../models/ingredient");
const dotenv = require("dotenv");
dotenv.config();
const AppError = require("../utils/AppError");

module.exports = class ingredientService {
	constructor() {}

	getAll = async function () {
		return new Promise(async (resolve, reject) => {
			try {
				const ingredients = await Ingredient.find({}).select(
					"_id name"
				);

				return resolve(ingredients);
			} catch (error) {
				return reject(error);
			}
		});
	};

	get = async function () {
		return new Promise(async (resolve, reject) => {
			try {
				const ingredient = await Ingredient.findById(
					req.params.id
				).select("_id name");

				return resolve(ingredient);
			} catch (error) {
				return reject(error);
			}
		});
	};

	create = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				const newIngredient = await Ingredient.create({
					name: params.name,
					createdBy: params.createdBy,
				});

				return resolve(newIngredient);
			} catch (error) {
				return reject(error);
			}
		});
	};

	update = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				const updatedIngredient = await Ingredient.findByIdAndUpdate(
                    params.id, 
                    { ...params }
                );
                await updatedIngredient.save();

				return resolve(updatedIngredient);
			} catch (error) {
				return reject(error);
			}
		});
	};

	delete = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
                await Ingredient.findByIdAndDelete(params.meal_id);

				return resolve(true);
			} catch (error) {
				return reject(error);
			}
		});
	};
};
