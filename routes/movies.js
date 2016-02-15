var express = require('express');
var session = require('express-session');
var router = express.Router();
var request = require('request');
var User = require('../models/user');

//5)
router.get('/movies', function(req, res, next) {
  if(req.session && req.session.user) {
  		User.findOne({'email':req.session.user.email}, function(err,result){
  			if(!result) {
  				req.session.reset();
  				res.redirect('/');
  			} else {
  				res.locals.user = result;
  				res.render('movies');
  			}
  		});
  } else {
  	//req.session.reset();
  	res.redirect('/');
  }
});

//6)
router.get('/movies/:id', function(req, res, next) {

	if(req.session && req.session.user) {
  		User.findOne({'email':req.session.user.email}, function(err,result){
  			if(!result) {
  				req.session.reset();
  				res.redirect('/');
  			} else {
  				//set locals variable and make serverside http request to nyt api
  				res.locals.user = result;
  				var id = req.params.id;
  				var api_key = process.env.NYT_API_KEY;
  				var nyt_uri = 'https://api.nytimes.com/svc/movies/v2/reviews/search';

				request({
					method: 'GET',
					uri: nyt_uri,
					qs: {nyt_movie_id: id, 'api-key': api_key},
					headers: {encoding: 'utf8', 'Content-type': 'application/json'}
				}, function(error, response, body) {
					if (error) throw error;
					console.log(response.statusCode);
					var movie = JSON.parse(body);
			
					res.render('show_movie', { title: movie.results[0].display_title,
											   rating: movie.results[0].mpaa_rating,
											   opened: movie.results[0].opening_date,
											   hl_auth: movie.results[0].byline,
											   headline: movie.results[0].headline,
											   capsule: movie.results[0].capsule_review,
											   summary: movie.results[0].summary_short,
											   copyright: movie.copyright
											   
					});//closes res.render show movie
				});//closes request
  			}
		});
  	} else {
  		res.redirect('/');
  	}
});
		
module.exports = router;
