const Meal = require("../models/meal");
const User = require("../models/User");

const AppError = require("../utils/AppError");

module.exports = class MealService {
	constructor() {}

	getAll = async function (user_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const meals = await Meal.find({ createdBy: user_id }).select(
					"_id name seasons ingredients image favourite"
				);

				return resolve(meals);
			} catch (error) {
				return reject(error);
			}
		});
	};

	get = async function (meal_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const meal = await Meal.findById(meal_id)
					.populate({
						path: "ingredients",
						model: "Ingredient",
						select: "_id name",
					})
					.populate({
						path: "createdBy",
						model: "User",
						select: "_id firstname lastname",
					});

				return resolve(meal);
			} catch (error) {
				return reject(error);
			}
		});
	};

	create = async function (user_id, meal_data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(user_id);
				console.log(user);
				const newMeal = await Meal.create({
					...meal_data,
					createdBy: user._id,
				});
				return resolve({ message: "meal created", meal: newMeal });
			} catch (error) {
				return reject(error);
			}
		});
	};

	update = async function (user_id, meal_id, meal_data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(user_id);

				const updated_meal = await Meal.findByIdAndUpdate(
					meal_id,
					{
						...meal_data,
						updatedBy: user._id,
					},
					{
						runValidators: true,
						new: true,
						useFindAndModify: false,
					}
				);

				await updatedMeal.save();

				return resolve(updated_meal);
			} catch (error) {
				return reject(error);
			}
		});
	};

	delete = async function (user_id, meal_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(user_id);
				const meal = await Meal.findById(meal_id);

				if (meal === null)
					return resolve({ message: "Meal not found" });

				Meal.deleteOne({ _id: meal._id }, function (err) {
					if (!err) {
						return resolve({ message: "meal deleted" });
					} else {
						throw new Error({ message: "error" });
					}
				});
			} catch (error) {
				return reject(error);
			}
		});
	};

	add_ingredient = async function () {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve();
			} catch (error) {
				return reject(error);
			}
		});
	};

	remove_ingredient = async function () {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve();
			} catch (error) {
				return reject(error);
			}
		});
	};
};
