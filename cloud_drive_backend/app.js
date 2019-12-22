const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const {STATUS_ERROR} = require('./lib/constants');
const env = require('dotenv').config();

if(process.env.USE_LOGGER === 'true') {
  app.use(logger('dev', {
    skip: function (req, res) {
      if(res.statusCode >= 400) {
        console.log(`Error:  ${res.err_msg ?  res.err_msg : "Not Found"}`);
        console.log("request body is : ", req.body);
      }
      return false;
    }
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
  return res.send({status: STATUS_ERROR, err_msg: err.message});
});

module.exports = app;
