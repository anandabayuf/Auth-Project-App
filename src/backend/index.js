const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const controllers = require("./controllers");
const cors = require("cors");

config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

controllers(app);

app.listen(process.env.PORT, () => {
	console.log(
		`Auth Project App API listening on http://localhost:${process.env.PORT}`
	);
});
