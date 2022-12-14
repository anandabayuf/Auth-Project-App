const express = require("express");
const router = express.Router();

const UserModel = require("../models/user.model");

router.post("/signin", async (req, res) => {
	UserModel.authenticate(req.body)
		.then((result) => res.json(result))
		.catch((err) => res.status(401).json(err));
});

router.post("/signup", async (req, res) => {
	try {
		res.status(201).json({
			status: "201 OK",
			message: "Successfully sign up",
			data: await UserModel.save(req.body),
		});
	} catch (err) {
		let message = "";
		if (err.keyPattern.username === 1) {
			message = "Error: Username has already taken";
		}
		res.status(400).json({
			status: "400 NOT FOUND",
			message,
			err,
		});
	}
});

module.exports = router;
