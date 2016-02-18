var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.user) {
		res.locals.user = req.session.user;
		res.render('login', {msg: null, 'username':res.locals.user.email});
	}	else {
			res.render('login', {msg: null, 'username':null})
	}
});

//2
router.post('/', function(req, res, next) {
	var login_email = req.body.email;
	var login_password = req.body.password;

	if(login_email === null || login_email === "" || login_email === " ") {
		res.send('Houstin we have an empty email');
	} else if(login_password === null || login_password === "" || login_password === " ") {
		res.send('Houstin we have an empty password');
	} else {
		User.findOne({'email':login_email}, function(err, result) {
			if (err) {
				console.log(err);
				throw err;
				//research err.code of 11000
			}
			if (!result) {
				res.render('login', { msg : 'Email or password is incorrect.  Please register or try again.', 'username':null});
			} else {//email found - check password.
				if (result.password === login_password) {//successful login
					req.session.user = result; //session and cookie are set, response header populated.
					res.redirect('/movies');
				} else {
					res.render('login', { msg : 'Email or password is incorrect.  Please register or try again.', 'username':null});
				}
			}	
		}); 
	}
});

router.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;
