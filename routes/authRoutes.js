const AuthController = require("../controllers/authController");
const authController = new AuthController();

module.exports.authRoutes = {
	auth: {
		method: "GET",
		path: "/auth",
		handler: authController.auth,
		auth: true,
	},
	register: {
		method: "POST",
		path: "/auth/register",
		handler: authController.register,
		auth: false,
	},
	login: {
		method: "POST",
		path: "/auth/login",
		handler: authController.login,
		auth: false,
	},
	logout: {
		method: "GET",
		path: "/auth/logout",
		handler: authController.logout,
		auth: true,
	},
};
