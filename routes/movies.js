var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/movies', function(req, res, next) {
  
  res.render('movies');
});

module.exports = router;
