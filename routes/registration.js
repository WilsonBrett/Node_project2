var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/user');

//3
router.get('/registration', function(req, res, next) {
	res.render('registration', {msg: null});
});

//4
router.post('/registration', function(req, res, next) {
	//if field values are not null, aren't spaces, and at least a certain length, create the user record
	var new_email = req.body.email;
	var new_password = req.body.password;

	if(new_email === null || new_email === "" || new_email === " ") {
		res.send('Houstin we have an empty email');
	} else if(new_password === null || new_password === "" || new_password === " ") {
		res.send('Houstin we have an empty password');
	} else {
		User.findOne({'email': new_email}, function(err, result) {
			if (err) {
				console.log(err);
				throw err;
			}

			if(!result) {
				var newUser = new User({
					email: new_email,
					password: new_password
				});

				req.session.user = newUser;

				newUser.save(function(err) {
					if (err) {
						console.log(err);
						throw err;
						//research err.code 11000
					}
					//set cookie or session so do not redirect to movies without a session
					res.redirect('/movies');
				});
			} else if(result.email === new_email) {
				res.render('registration', {msg: 'Email taken. Click Cancel.'});
			}

		});
	}
	
	//res.render('movies', {email: new_email });
});

module.exports = router;
