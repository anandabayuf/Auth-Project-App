const userController = require("./user.controller");

module.exports = (app) => {
	app.use("/user", userController);
};
