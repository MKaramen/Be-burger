const path = require("path");

module.exports = {
	entry: "./src/rivescript.js",
	output: {
		filename: "rivescript.js",
		path: path.resolve(__dirname, "dist"),
		library: "RiveScript"
	},
	node: {
		fs: "empty"
	},
	target: "web",
	mode: "development",
}
