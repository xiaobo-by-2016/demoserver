var express = require('express');

var SmsService = require('./SmsService')

var LoginService = {
    login: function (req, res, next) {
        SmsService.sendSmsRegister('18428369049',function(smsResult){
            if(smsResult.Code == 'OK'){
                res.send('短信发送成功！！！')
            }else{
                res.send('短信发送成功！！！')
            }
        });
        

    },
    register: function (req, res, next) {

        res.send('register');

    },
    findPassword: function (req, res, next) {

        res.send('findPassword');

    },
}

module.exports = LoginService;