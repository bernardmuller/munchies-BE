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

			user._id = requestUser._id;
			user.updatedBy = requestUser._id;

			const updatedUser = await userService.update(user);

			return res.status(200).send(updatedUser);
		} catch (error) {
			throw new AppError(error, 500);
		}
	};
};
