const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AuthService = require("../services/authService");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const authService = new AuthService();
dotenv.config();

module.exports = class AuthController {
	contructor() {}

	register = async function (req, res) {
		try {
			const user_data = {
				email: req.body.email,
				password: req.body.password,
			};

			if (!user_data.email)
				res.status(401).send({ message: "no email provided" });

			if (!user_data.password)
				res.status(401).send({ message: "no password provided" });

			const response = await authService.register(user_data);

			res.status(201).json(response);
		} catch (error) {
			console.log(error);
			// res.status(400).json({ errors });
		}
	};

	login = async function (req, res) {
		try {
			const user_data = {
				email: req.body.email,
				password: req.body.password,
			};

			if (user_data.email == undefined)
				res.status(401).send("no email provided");

			if (user_data.password == undefined)
				res.status(401).send("no password provided");

			const response = await authService.login(
				user_data.email,
				user_data.password
			);

			res.status(200).json(response);
		} catch (error) {
			console.log(error);
			// res.status(400).send({ errors });
		}
	};

	logout = async (req, res) => {
		try {
			res.cookie("token", `${process.env.JWT_SECRET}`, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
				maxAge: 1,
			});
			res.status(200).json();
		} catch (error) {
			console.log(error);
		}
	};

	auth = async (req, res) => {
		try {
			if (!res.locals.user)
				return res
					.status(401)
					.json({ auth: false, message: "Unauthorized" });

			const currentUser = await User.findById(res.locals.user);
			if (!currentUser)
				res.status(401).send({ auth: false, message: "Unauthorized" });
			return res.status(200).send({ auth: true });
		} catch (error) {
			throw new AppError(error, 500);
		}
	};
};
