var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {msg: null});
});

//2
router.post('/', function(req, res, next) {
	var login_email = req.body.email;
	var login_password = req.body.password;

	if(login_email === null || login_email === "" || login_email === " ") {
		alert('please enter a valid email');
	} else if(login_password === null || login_password === "" || login_password === " ") {
		alert('please enter a valid password');
	} else {
		User.findOne({'email':login_email}, 'email password', function(err, result) {
			if (err) {
				console.log(err);
				throw err;
			}
			
			if (result === null) {
				res.render('index', { msg : 'Email not found.  Please register or try again.' });
			} else {//email found - check password.
				if (result.password === login_password) {
					res.render('movies', {email: login_email});
				} else {
					res.render('index', { msg : 'Password is incorrect.  Please try again.' });
				}
			}	
		}); 
	}
});


module.exports = router;
