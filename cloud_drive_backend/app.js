const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const env = require('dotenv').config();
const flash = require('express-flash');
const session = require('express-session');
const initPassport = require('./common/passport_init');
const passport = require('passport');

if(process.env.USE_LOGGER === 'true') {
  app.use(logger('dev', {
    skip: function (req, res) {
      return false;
    }
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());
app.use(session({
  secret: process.env.ADMIN_PASSWORD,
  resave: false,
  saveUninitialized: false
}));

// set up the passport for our back authentication
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);



app.use('/', indexRouter);

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
  return res.send({status: process.env.STATUS_ERROR, err_msg: err.message});
});

module.exports = app;
