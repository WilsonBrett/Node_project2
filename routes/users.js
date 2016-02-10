var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/users', function(req, res, next) {
  res.render('users');
});

//3
router.get('/users/new', function(reg, res, next) {
	res.render('new_user');
});

//4
router.post('/users', function(reg, res, next) {
	//if field values are not null, aren't spaces, and at least a certain length, create the user record
	//User.save();
	//then if save is successful, bring me to the find movies page
	res.redirect('/movies');
});

module.exports = router;
