var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/**********请求路径变量**********/
var LoginService = require('./services/LoginService')
var UserService = require('./services/UserService')
var TopicService = require('./services/TopicService')
var ProgressService = require('./services/ProgressService')






var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



/**********解决跨域请求（发布时屏蔽）**********/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

/**********请求路径变配置**********/
//加载前端项目程序到服务器
app.use('/', express.static(path.join(__dirname, 'client')));
//请求配置
app.post('/login', LoginService.login);
app.post('/register', LoginService.register);
app.post('/findPassword', LoginService.findPassword);
app.post('/sendSmsCode', LoginService.sendSmsCode);
app.post('/updatePassword',UserService.updatePassword);
app.post('/updateUserInfo',UserService.updateUserInfo);
app.post('/addTopic',TopicService.addTopic);
app.post('/getTopicsByTecAcc',TopicService.getTopicsByTecAcc);
app.post('/getTopicsByKey',TopicService.getTopicsByKey);
app.post('/selectTopic',TopicService.selectTopic);
app.post('/getTopicsByCollegeId',TopicService.getTopicsByCollegeId);
app.post('/getTopicsByStuKey',TopicService.getTopicsByStuKey);
app.post('/getSchoolList',UserService.getSchoolList);
app.post('/deleteTopic',TopicService.deleteTopic);
app.post('/getCheckedTopic',TopicService.getCheckedTopic);
app.post('/addProgress',ProgressService.addProgress);
app.post('/getProList',ProgressService.getProList);
app.post('/deletePro',ProgressService.deletePro);


console.log(new Date().getMinutes())




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
