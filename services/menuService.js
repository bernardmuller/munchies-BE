const Menu = require("../models/menu");
const dotenv = require("dotenv");
dotenv.config();
const AppError = require("../utils/AppError");
const grocerylistService = require("./grocerylistService");

module.exports = class menuService {
	constructor() {}

	create = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				let new_menu = new Menu({
					name: "Untitled Menu",
					createdBy: params,
				});

				const newGroceryList = await grocerylistService.create({
					menu_id: new_menu._id,
					// meal_items: newMenu.meals,
					createdBy: params,
				});

				new_menu.grocerylist = newGroceryList._id;

				await newGroceryList.save();
				await new_menu.save();

				return resolve(new_menu);
			} catch (error) {
				return reject(error);
			}
		});
	};

	get = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				const menu = await Menu.findById(params.id)
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
							model: "Meal",
							select: "id name ingredients",
							populate: {
								path: "ingredients",
								model: "Ingredient",
								select: "id name",
							},
						},
					});
				return resolve(menu);
			} catch (error) {
				return reject(error);
			}
		});
	};

	getAll = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				const menus = await Menu.find({ createdBy: params });

				return resolve(menus);
			} catch (error) {
				return reject(error);
			}
		});
	};

	update = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve();
			} catch (error) {
				return reject(error);
			}
		});
	};

	mealslist = async function (params) {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve();
			} catch (error) {
				return reject(error);
			}
		});
	};

	//delete
};
