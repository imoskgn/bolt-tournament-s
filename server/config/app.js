var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// database setup
let mongoose = require('mongoose');
let DB = require('./db')

// connect mongoose 
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true})
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "Connection Error: "))
mongoDB.once('open', ()=>{
  console.log('Connected to mongodb ...')
})


// add more routes here
var tournamentRouter = require('../routes/tournament');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/tournament', tournamentRouter);



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
});

module.exports = app;
