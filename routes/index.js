var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

  //console.log(req.session);
  //console.log('--------------------');
  //console.log(req.cookies); //cookie parser should populate this from the headers
  res.render('index', {msg: null});
});

//2
router.post('/index', function(req, res, next) {
	var login_email = req.body.email;
	var login_password = req.body.password;

	if(login_email === null || login_email === "" || login_email === " ") {
		res.send('Houstin we have an empty email');
	} else if(login_password === null || login_password === "" || login_password === " ") {
		res.send('Houstin we have an empty password');
	} else {
		User.findOne({'email':login_email}, 'email password', function(err, result) {
			if (err) {
				console.log(err);
				throw err;
				//research err.code of 11000
			}
			if (!result) {
				res.render('index', { msg : 'Email or password is incorrect.  Please register or try again.'});
			} else {//email found - check password.
				if (result.password === login_password) {//successful login
					console.log('------------------');
					req.session.user = result; //set-cookie: session='bfbfoulhbfou' email password goes into header of the response.
					console.log(req.session);
					res.redirect('/movies');
				} else {
					res.render('index', { msg : 'Email or password is incorrect.  Please register or try again.'});
				}
			}	
		}); 
	}
});


module.exports = router;
