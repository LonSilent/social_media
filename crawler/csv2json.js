var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromFile("food.csv", function(err, result) {
	console.log(result);
});
