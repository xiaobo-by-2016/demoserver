var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/**********请求路径变量**********/
var LoginService = require('./services/LoginService')


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/**********请求路径变配置**********/
//加载前端项目程序到服务器
app.use('/', express.static(path.join(__dirname, 'client')));
//请求配置
app.post('/login', LoginService.login);
app.get('/register', LoginService.register);
app.get('/findPassword', LoginService.findPassword);
app.post('/getVailCode', LoginService.sendSmsCode);


console.log(new Date().getTime())




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
