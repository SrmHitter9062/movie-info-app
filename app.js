var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var elastic = require("./services/elasticSearch");
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var configDb = require('./config/config-db')();
var dbUrl = configDb.dbUrl.mongoCloudUrl;
// mongoose.connect(dbUrl,function(err,res){
//   if(err){
//     console.log('db connection failed in app.js: '+err);
//   }
//   else{
//     console.log('db connection success in app.js: '+dbUrl);
//   }
// })

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// check if movies index is present or not
elastic.isIndexExists("movies").then(function(exists){
  if(exists){
    console.log("es movie index exists");
    // elastic.deleteIndex("movies");
  }else{
    console.log("index does not exist and creating...");
    elastic.createMovieIndex(); // default index is movies
    console.log("index created");
  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('here ', err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
