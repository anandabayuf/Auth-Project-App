const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/AuthProjectDB")
	.then(() => {
		console.log("MongoDB connection has been established successfully.");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB: ", error);
	});

exports.UserSchema = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true,
	},
	password: String,
	email: String,
	salt: String,
});
