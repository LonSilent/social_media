var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var beauty = require('./data/japan.json');

food = _.uniq(beauty, "number");

// console.log(food[1]);

var file_name = 'result_japan.csv';

const offset = 0;
const limit = food.length-1;


fs.writeFile(file_name, 'title,url,hits,user,device,hour,count_images,count_comments,' + 'body\n', function(err) {
	if (err) return console.log(err);
});

getter(offset);

function RemoveHTML(strText) {
	var regEx = /(<([^>]+)>)/ig;
	var newline = /\r?\n|\r/g;

	return strText.replace(new RegExp("&nbsp;", 'g'), "").replace(newline, "").replace(new RegExp(",", 'g'), "，").replace(regEx, "");

}

function getter(i) {
	if (i < limit) {
		var url = 'https://emma.pixnet.cc/blog/articles/' + food[i].number + '?format=json&user=' + food[i].id +
			'&pretty_print=1?client_id={890707c454da63b6d54b45c6b067ec8a}';
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				result = JSON.parse(body);
				var body = result.article.body;
				body = RemoveHTML(body);
				console.log(result.article.title);
				var string = result.article.title + ',' +
					result.article.link + ',' +
					result.article.hits.total + ',' +
					result.article.user.name + ',' +
					food[i].device + ',' +
					food[i].hour + ',' +
					result.article.images.length + ',' +
					result.article.info.comments_count + ',' + body + '\n';
				console.log("success: " + i);
				fs.appendFile(file_name, string, function(err) {
					if (err) return console.log(err);
				});
				getter(i + 1)
			} else {
				console.log(error);
				console.log("error: " + i);
				getter(i + 1)
			}
		});
	}
}
