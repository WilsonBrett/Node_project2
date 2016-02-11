var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

//5)
router.get('/movies', function(req, res, next) {
  
  res.render('movies');
});

//6)
router.get('/movies/:id', function(req, res, next) {
	var id = req.params.id;

	res.render('show_movie');
});

module.exports = router;
