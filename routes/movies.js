var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');

//5)
router.get('/movies', function(req, res, next) {
  
  res.render('movies', {email: null});
});

//6)
router.get('/movies/:id', function(req, res, next) {
	var id = req.params.id;
	var api_key = process.env.NYT_API_KEY; //'056315a59749a59d691a6476f262a589:3:74337495';
	var nyt_uri = 'http://api.nytimes.com/svc/movies/v2/reviews/search';

	request({
		method: 'GET',
		uri: nyt_uri,
		qs: {nyt_movie_id: id, 'api-key': api_key},
		headers: {encoding: 'utf8', 'Content-type': 'application/json'}
	}, function(error, response, body) {
		if (error) throw error;
		console.log(response.statusCode);
		var movie = JSON.parse(body);

		console.log('movie:' + movie);
		res.render('show_movie', { title: movie.results[0].display_title,
								   rating: movie.results[0].mpaa_rating,
								   opened: movie.results[0].opening_date,
								   hl_auth: movie.results[0].byline,
								   headline: movie.results[0].headline,
								   capsule: movie.results[0].capsule_review,
								   summary: movie.results[0].summary_short,
								   copyright: movie.copyright
								   
		});
	});
});
		
module.exports = router;
