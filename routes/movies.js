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
//router.get('/movies/:movTitle', function(req, res, next) {
router.get('/movies/:id', function(req, res, next) {
	if(req.session && req.session.user) {
  		User.findOne({'email':req.session.user.email}, function(err,result){
  			if(!result) {
  				req.session.destroy();
  				res.redirect('/');
  			} else {
  				//set locals variable and make serverside http request to nyt api
  				res.locals.user = result;
  				//var title = req.params.movTitle;
          var id = req.params.id;

				request({
					method: 'GET',
					uri: 'http://omdbapi.com',
					//qs: {'t':title, 'r':'json'},
          qs: {'i':id},
					headers: {encoding: 'utf8', 'Content-type': 'application/JSON'}
				}, function(error, response, body) {
						console.log("Response *****",response.request.uri.path,"Response *****");
						var movie = JSON.parse(body);
            console.log(movie);

						var keys = ['Title','Released','Rated','Genre','Plot'];
						var my_obj = {};
						for(i=0; i<keys.length; i++) {
							if(movie[keys[i]]) { my_obj[keys[i]] = movie[keys[i]] }
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
