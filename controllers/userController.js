const User = require("../models/User");
const UserService = require("../services/userService");
const userService = new UserService();
//getUser
//updateUser
//getAllusers
//change role
//isAdmin
//changeRole - requires my token
//deleteUser
module.exports = class userController {
	get = async (req, res) => {
		console.log("get user");
		try {
			const user = await userService.get(req.params.id);

			return res.status(200).send(user);
		} catch (error) {
			throw new AppError(error, 500);
		}
	};

	update = async (req, res) => {
		try {
			const requestUser = await User.findById(req.params.id);

			if (requestUser._id != res.locals.user)
				res.status(400).send({ message: "not allowed" });

			let user = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				bio: req.body.bio,
			};

			let updateObject = {};

			for (const item in user) {
				if (!item == undefined) {
					updateObject[item] = user[item];
				}
			}

			updateObject._id = requestUser._id;
			updateObject.updatedBy = requestUser._id;

			const updatedUser = await userService.update(updateObject);

			return res.status(200).send(updatedUser);
		} catch (error) {
			throw new AppError(error, 500);
		}
	};
};
