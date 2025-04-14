if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Örnek bir middleware tanımlama
app.use((req,res,next) => {
  console.log("Ben app.js'te tanimlanan bir middleware'im.");
  next();
});


app.use('/api', require('./routes/index'));
app.use('/api/users',  require('./routes/users'));
app.use('/api/auditlogs',  require('./routes/auditlogs'));
app.use('/api/categories',  require('./routes/categories'));
app.use('/api/roles',  require('./routes/roles'));
app.use('/api/events',  require('./routes/events'));
app.use('/api/stats',  require('./routes/stats'));




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

module.exports = app;
