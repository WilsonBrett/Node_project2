var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//don't need cookie parser in newest version of express-sessions
var cookieParser = require('cookie-parser'); //looks at the headers to parse the cookies out of the transaction
var bodyParser = require('body-parser'); //express middleware that allows post, and allows us to access req.body
var mongoose = require('mongoose');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var movies = require('./routes/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_CONN_MOVIESDB);

app.use(routes);
app.use(users);
app.use(movies);

app.use(session({
  secret: 'brett',
  //lastpage: '',
  resave: true,
  saveUninitialized: true
}));

/*
app.use(session({
  // use UUIDs for session IDs
  genid: function(req) {
    return genuuid();}, 
  secret: 'brett',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//cookie handler
//browser sends http request and server doesn't know if it has a cookie with the request
	//app.js tests for the presence of the cookie
		//if the cookie is found
		//else if the cookie isn't found


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
