var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var load = require('express-load');
var mongoose = require('mongoose').set('debug', true);
var moment = require('moment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

load('models').then('controllers').then('routes').into(app);

//isto faz com que o modulo moment fique disponivel para todo o projeto
app.locals.moment = moment;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds255329.mlab.com:55329/aesodb', function (err) {
  if (err) {
    console.log("Erro ao conectar ao banco: " + err)
  } else {
    console.log("Conexão estabelecida com sucesso !")
  }
});

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