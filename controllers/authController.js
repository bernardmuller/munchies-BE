const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AuthService = require("../services/authService");
const authService = new AuthService();
dotenv.config();

module.exports = class AuthController {
	contructor() {}

	register = async function(req, res) {
		try {
			const user_data = {
				email: req.body.email,
				password: req.body.password,
			};

			if (!data.email) res.status(401).send("no email provided");

			if (!data.password) res.status(401).send("no password provided");

            const response = await AuthService.register(user_data)

			res.status(201).json(response);
		} catch (error) {
            console.log(error)
			// res.status(400).json({ errors });
		};
	};

	login = async function(req, res) {
		try {
            
            const user_data = {
				email: req.body.email,
				password: req.body.password,
			};

			if (user_data.email == undefined) res.status(401).send("no email provided");

			if (user_data.password == undefined) res.status(401).send("no password provided");

            const response = await authService.login(user_data.email, user_data.password);

			res.status(200).json(response);
		} catch (error) {
			console.log(error);
			// res.status(400).send({ errors });
		};
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
		let currentUser = res.locals.currentUser;
		if (!currentUser)
			return res
				.status(401)
				.json({ auth: false, message: "Unauthorized" });

		jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decodedtoken) => {
			if (err)
				return res
					.status(401)
					.json({ auth: false, message: err.message });
			res.status(200).json({ auth: true, message: "Authorized" });
		});
	};

    bark = () => {
        console.log('bark')
    }
};
