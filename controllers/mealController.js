const Meal = require("../models/meal");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const MealService = require("../services/mealService");
const mealService = new MealService();

module.exports = class MealController {
	constructor() {}

	getAll = async function (req, res) {
		try {
			const meals = await Meal.find({
				createdBy: res.locals.user,
			}).select("_id name seasons ingredients image favourite");
			res.status(200).send(meals);
		} catch (error) {
			console.log(error);
		}
	};

	get = async function (req, res) {
		try {
			console.log("check");
			const meal_id = req.params.id;

			if (!meal_id) res.status(400).send("no meal provided");

			const meal = await mealService.get(meal_id);

			res.status(200).send(meal);
		} catch (error) {
			console.log(error);
		}
	};

	create = async function (req, res) {
		try {
			const user = await User.findById(res.locals.user);

			let meal = {
				name: req.body.name,
				seasons: req.body.seasons,
				directions: req.body.directions,
				ingredients: req.body.ingredients,
				cuisine: req.body.cuisine,
				favourite: req.body.favourite,
				image: req.body.image,
				url: req.body.url,
				prep_time: req.body.prepTime,
				cook_time: req.body.cookc_time,
				ready_in: req.body.ready_in,
				rating: req.body.rating,
				notes: req.body.notes,
				createdBy: user._id,
			};

			const new_meal = await mealService.create(user._id, meal);

			res.status(200).send({ message: "meal created", meal: new_meal });
		} catch (error) {
			throw new AppError(error.errors.name.message, 400);
		}
	};

	update = async function (req, res) {
		try {
			let meal = {
				meal_id: req.params.id,
				name: req.body.name,
				seasons: req.body.seasons,
				directions: req.body.directions,
				ingredients: req.body.ingredients,
				cuisine: req.body.cuisine,
				favourite: req.body.favourite,
				image: req.body.image,
				url: req.body.url,
				prep_time: req.body.prepTime,
				cook_time: req.body.cookc_time,
				ready_in: req.body.ready_in,
				rating: req.body.rating,
				notes: req.body.notes,
			};

			meal.user = res.locals.user;

			const updatedMeal = await mealService.update(meal);

			res.status(200).send(updatedMeal);
		} catch (error) {
			throw new AppError(error.errors.name.message, 400);
		}
	};

	delete = async (req, res) => {
		try {
			const user = await User.findById(res.locals.user);
			const meal = await Meal.findById(req.params.id);

			if (meal === null)
				res.status(401).send({ message: "Meal not found" });

			Meal.deleteOne({ _id: req.params.id }, function (err) {
				if (!err) {
					res.status(200).send({ message: "Meal deleted" });
				} else {
					res.status(500).send({ message: "error" });
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	favourite = async (req, res) => {
		const user = await User.findById(res.locals.user);
		const meal = await Meal.findById(req.params.id);

		if (user._id !== meal.createdBy) {
			res.status(401).send({
				message: "You are not the creator of this meal.",
			});
		}
		const updatedMeal = await Meal.findByIdAndUpdate(
			req.params.id,
			{
				favourite: req.body.favourite,
				updatedBy: user._id,
			},
			{
				runValidators: true,
				new: true,
				useFindAndModify: false,
			}
		).select("id name favourite");
		res.status(401).send({ message: "Success", updatedMeal });
	};

	add = async (req, res) => {
		try {
			const meal_id = req.params.id;
			const { ingredient_id } = req.body;
			let user = res.locals.user;

			if (
				!ingredient_id ||
				ingredient_id === "" ||
				ingredient_id === undefined
			) {
				throw new AppError("No ingredient to add", 400);
			}

			let meal = await Meal.findById(meal_id);

			meal.ingredients.push(ingredient_id);

			meal.updatedBy = user;

			await meal.save();

			res.status(200).send({
				message: "Ingredient added to meal",
				meal: meal,
			});
		} catch (error) {
			throw new AppError(error.errors.name.message, 400);
		}
	};

	remove = async (req, res) => {
		try {
			const meal_id = req.params.id;
			const { ingredient_id } = req.body;
			let user = res.locals.user;

			if (
				!ingredient_id ||
				ingredient_id === "" ||
				ingredient_id === undefined
			) {
				throw new AppError("No ingredient provided", 400);
			}

			let meal = await Meal.findById(meal_id);

			meal.ingredients = meal.ingredients.filter(function (
				item,
				index,
				arr
			) {
				return item != ingredient_id;
			});

			meal.updatedBy = user;

			await meal.save();

			res.status(200).send({
				message: "Ingredient removed from meal",
				meal: meal,
			});
		} catch (error) {
			throw new AppError(error.errors.name.message, 400);
		}
	};
};
