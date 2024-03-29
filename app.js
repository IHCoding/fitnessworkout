var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Imal:pass123@fitnessworkout-ootjq.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true} );
var db = mongoose.connection;

require('./models/db');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var programRouter = require('./routes/program');
var app = express();

//  for monoose error messages due to versioning issue - DeprecationWarning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// web: npm start

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login' , loginRouter);
app.use('/signup' , signupRouter);
app.use('/program', programRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.use(express.static('public'))

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//expres session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
})

module.exports = app;
