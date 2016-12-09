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
  				req.session.destroy();
  				res.redirect('/');
  			} else {//set the locals variable so ejs can put the users email on the page.
  				res.locals.user = result;
  				res.render('movies', {'username': res.locals.user.email});
  			}
  		});
  } else {
  	res.redirect('/');
  }
});

//6)
router.get('/movies/:movTitle', function(req, res, next) {
	if(req.session && req.session.user) {
  		User.findOne({'email':req.session.user.email}, function(err,result){
  			if(!result) {
  				req.session.destroy();
  				res.redirect('/');
  			} else {
  				//set locals variable and make serverside http request to nyt api
  				res.locals.user = result;
  				var title = req.params.movTitle;
  				title = ("'" + title + "'");
  				var api_key = process.env.NYT_API_KEY;

				request({
					method: 'GET',
					uri: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json',
					qs: {'query':title,'api-key':api_key},
					headers: {encoding: 'utf8', 'Content-type': 'application/JSON'}
				}, function(error, response, body) {
						console.log("Response *****",response.request.uri.path,"Response *****")
						var movie = JSON.parse(body);
						var keys = ['display_title','mpaa_rating','opening_date','byline','headline','capsule_review','summary_short'];
						var my_obj = {};
						for(i=0; i<keys.length; i++) {
							if(movie.results[0][keys[i]]) { my_obj[keys[i]] = movie.results[0][keys[i]] }
						}
						res.render('show_movie', {'my_object':my_obj, 'username':res.locals.user.email});
				});
			}
		});
  	} else {
  		res.redirect('/');
  	}
});

module.exports = router;
