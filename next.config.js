const path = require("path");

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, "src/lib/styles")],
		data: '@import "ref";',
		prependData: '@import "ref";',
	},
	target: "experimental-serverless-trace",
};
