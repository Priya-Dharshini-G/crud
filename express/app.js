'use strict';

var express = require('express');
var app = express();

var cryptoService = require('./services/cryptoService');
require('./config/config');
require('./config/imports');
require('./global_function');
require('./constants/message');


var logger = require('morgan');
var v1 = require('./routes/v1');
var v2 = require('./routes/v2');
var bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
const jobService = require('./services/jobService');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '' }));
app.use(passport.initialize());

var model = require('./models');
const { job } = require('cron');
model.sequelize.authenticate().then(() => {
  console.log('connect to sql database', CONFIG.db_name);
}).catch((err) => {
  console.log('Unable to connect database', CONFIG.db_name, err.message);
});
if (CONFIG.app === 'local') {
  model.sequelize.sync({ alter: true });
}

app.use(function (req, res, next) {
  if (req && req.headers && req.headers.authorization) {
    req.headers.authorization = cryptoService.decrypt(req.headers.authorization)
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/v1', v1);
app.use('/v2',v2);

app.use('/Images', express.static('./Images'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

jobService.sendBirthWish();

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
console.log('Instances loaded successfully.');

module.exports = app;
