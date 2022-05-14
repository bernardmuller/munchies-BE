const Meal = require("../models/meal");
const User = require("../models/User");
const Menu = require("../models/menu");
const Item = require("../models/item");
const GroceryList = require("../models/groceryList");
const MenuService = require("../services/menuService");
const AppError = require("../utils/AppError");
const menuService = new MenuService();

module.exports = class menuController {
	constructor() {}

	create = async function (req, res) {
		try {
			const user = await User.findById(res.locals.user);

			const new_menu = await menuService.create(user.id);

			res.status(200).send(new_menu);
		} catch (error) {
			console.log(error);
		}
	};

	getAll = async function (req, res) {
		try {
			const menus = await menuService.getAll(res.locals.user);

			return res.status(200).send(menus);
		} catch (error) {
			console.log(error);
		}
	};

	get = async function (req, res) {
		try {
			const menu = await Menu.findById(req.params.id)
				.populate({
					path: "meals",
					model: "Meal",
					select: "_id name favourite image seasons",
				})
				.populate({
					path: "createdBy",
					model: "User",
					select: "_id firstname",
				})
				.populate({
					path: "grocerylist",
					model: "GroceryList",
					select: "_id meal_items extra_items",
					populate: {
						path: "meal_items",
						model: "Item",
						populate: {
							path: "ingredient",
							model: "Ingredient",
							select: "id name",
						},
					},
				})
				.populate({
					path: "grocerylist",
					model: "GroceryList",
					select: "_id meal_items extra_items",
					populate: {
						path: "extra_items",
						model: "Item",
						select: "id name check",
					},
				});

			if (!menu) {
				res.status(400).send({ message: "no menu found" });
			}

			res.status(200).send(menu);
		} catch (error) {
			console.log(error);
		}
	};

	update = async function (req, res) {
		try {
			let menu = {
				id: req.params.id,
				name: req.body.name,
			};

			menu.updatedBy = res.locals.user;

			const response = await menuService.update(menu);

			console.log(response);

			res.status(200).send(response);
		} catch (error) {
			console.log(error);
		}
	};

	mealsList = async function (req, res) {
		try {
			let menu = await Menu.findById(req.params.id);

			if (!menu)
				return res.status(400).send({
					message: "menu not found",
				});

			let grocerylist = await GroceryList.findById(menu.grocerylist._id);

			if (!grocerylist)
				return res.status(400).send({
					message: "grocerylist not found",
				});

			const user = await User.findById(res.locals.user);

			let newMeals = [];
			for (const meal of req.body.meals) {
				const dbmeal = await Meal.findById(meal);
				if (!dbmeal)
					return res.status(400).send({
						message: `meal "${meal.id}" not found`,
					});
				// newMeals.push({ "_id" : meal.id });
				newMeals = [...newMeals, dbmeal];
				// menu.meals.push(meal)
			}

			let groceryItems = [];
			for (const meal of newMeals) {
				const dbmeal = await Meal.findById(meal.id).populate({
					path: "ingredients",
					model: "Ingredient",
				});

				for (const ingredient of dbmeal.ingredients) {
					let newItem = new Item({
						item_type: 1,
						ingredient: ingredient._id,
						createdBy: user._id,
					});

					groceryItems = [...groceryItems, newItem];
					await newItem.save();
				}
			}

			grocerylist.meal_items = groceryItems;
			menu.meals = newMeals;
			menu.updatedBy = res.locals.user;

			await grocerylist.save();
			await menu.save();

			// const response = await menuService.mealslist(menu)

			res.status(200).send(menu);
		} catch (error) {
			console.log(error);
		}
	};

	delete = async function (req, res) {
		try {
			const menu = await Menu.findById(req.params.id);
			if (menu === null)
				res.status(401).send({ message: "Menu not found" });

			await Menu.findByIdAndDelete({ _id: menu._id });
			const deletedMenu = await Menu.findById({ _id: menu._id });

			if (deletedMenu) {
				return res.send("failed");
			}
			return res.status(200).send("success");
		} catch (error) {
			console.log(error);
			return res.send(error);
		}
	};

	extraItem = async function (req, res) {
		try {
			let item = {
				name: req.body.name,
			};

			const user = await User.findById(res.locals.user);
			const menu = await Menu.findById(req.params.id);
			const menuGroceryList = await GroceryList.findById(
				menu.grocerylist
			);

			let newItem = new Item({
				...item,
				createdBy: user._id,
			});

			menuGroceryList.extra_items = [
				...menuGroceryList.extra_items,
				newItem,
			];

			await newItem.save();
			await menuGroceryList.save();

			return res.status(200).send(menu);
		} catch (error) {
			console.log(error);
			return res.send(error);
		}
	};
};
