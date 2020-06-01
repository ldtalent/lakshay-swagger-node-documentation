const mongoose = require("mongoose");
const fruitsSchema = new mongoose.Schema({

	name: {
		type: String
	}

});

module.exports = fruits = mongoose.model("fruits", fruitsSchema)