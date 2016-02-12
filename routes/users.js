var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

//3
router.get('/users/new', function(req, res, next) {
	res.render('new_user', {msg: null});
});

//4
router.post('/users/new', function(req, res, next) {
	//if field values are not null, aren't spaces, and at least a certain length, create the user record
	var new_email = req.body.email;
	var new_password = req.body.password;

	if(new_email === null || new_email === "" || new_email === " ") {
		alert('please enter a valid email');
	} else if(new_password === null || new_password === "" || new_password === " ") {
		alert('please enter a valid password');
	} else {
		User.findOne({'email': new_email}, 'email password', function(err, result) {
			if (err) {
				console.log(err);
				throw err;
			}

			if(result === null) {
				var newUser = new User({
					email: new_email,
					password: new_password
				});

				newUser.save(function(err) {
					if (err) {
						console.log(err);
						throw err;
					}

					res.render('movies', {email: new_email});
				});
			} else if(result.email === new_email) {
				res.render('new_user', {msg: 'Email already on file. Click Cancel.'});
			}

		});
	}
	
	//res.render('movies', {email: new_email });
});

module.exports = router;
