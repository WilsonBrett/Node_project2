var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {msg: null, val: null});
});

//2
router.post('/', function(req, res, next) {
	var login_email = req.body.email;
	var login_password = req.body.password;

	if(login_email === null || login_email === "" || login_email === " ") {
		//console.log('Houstin we have an empty email');
		res.send('Houstin we have an empty email');
	} else if(login_password === null || login_password === "" || login_password === " ") {
		//console.log('Houstin we have an empty password');
		res.send('Houstin we have an empty password');
	} else {
		User.findOne({'email':login_email}, 'email password', function(err, result) {
			if (err) {
				console.log(err);
				throw err;
			}
			
			if (result === null) {
				res.render('index', { msg : 'Email not found.  Please register or try again.', val: null});
			} else {//email found - check password.
				if (result.password === login_password) {//successful login
					res.redirect('/movies');
				} else {
					res.render('index', { msg : 'Password is incorrect.  Please try again.', val: login_email });
				}
			}	
		}); 
	}
});


module.exports = router;
