// import { request } from 'https';

var express = require('express');

var SmsService = require('./SmsService');
var sqlActions = require('../data-base-action/sqlActions');
var sqlObj = {
    loginStr:
        `SELECT u.user_id       userId,
	    u.user_account      userAccount,
	    u.user_phone        userPhone,
	    u.user_name         userName,
	    c.college_id        collegeId,
	    c.college_name      collegeName,
	    r.role_id           roleId,
	    r.role_name         roleName
    FROM        t_user          u,
                t_role          r, 
                t_college_info  c
    WHERE   u.user_role_id = r.role_id 
    AND     u.user_college_id = c.college_id
    AND     (u.user_account=? OR u.user_phone=?) 
    AND     u.user_password=?`,
    registerStr:
        `
    
    `,
    //该手机是否存在记录
    isValiCodeStr: `SELECT * FROM t_vali_code WHERE vali_code_phone =?`,
    updateCode: `UPDATE t_vali_code SET vali_code = ? ,vali_time =? WHERE vali_code_phone = ?`,
    insertCode: `INSERT INTO t_vali_code SET ?`
};


var LoginService = {
    /*
    *通过 user_account(学号/工号) or user_phone(手机号) and user_password(密码) 登陆
    *返回用户基本信息userInfo
    */
    login: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(
            sqlObj.loginStr,
            [req.body.userAccount,
            req.body.userPhone,
            req.body.userPassword
            ], function (err, results, fields) {

                if (err) {
                    res.send({
                        success: false,
                        error: err,
                        message: err
                    })
                } else {
                    if (results.length == 1) {
                        res.send({
                            success: true,
                            userInfo: results,
                            message: '登陆成功',
                        })
                    } else {
                        res.send({
                            success: true,
                            userInfo: results,
                            message: '账号信息不正确',
                        })
                    }

                }
            })
    },
    register: function (req, res, next) {

        res.send('register');

    },
    findPassword: function (req, res, next) {

        res.send('findPassword');

    },
    /*
    *验证码
    *1）验证表中改该手机号是否存在记录，无->新增   有->更新
    *2）发送短信成功后 更新码值
        参数： userPhone:目标手机号  smsActnStat： 1：注册  2：找回
    */
    sendSmsCode: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.isValiCodeStr, [
            req.body.userPhone
        ], function (err, results, fields) {
            if (err) {
                //查询失败
                res.send({
                    success: false,
                    message: err
                })
            } else {
                //查询成功
                var code = LoginService.getRandomCode(4);//四位随机数
                SmsService.sendSmsRegister({
                    templateParam: code,
                    phoneNumbers: req.body.userPhone,
                    templateIndex: req.body.smsActnStat
                }, function (smsResult) {
                    if (JSON.parse(smsResult).Code == 'OK') {
                        if (results.length == 1) {
                            //该手机号存在验证码记录
                            sqlActions.updateActions.update(sqlObj.updateCode, [
                                code,
                                new Date().getTime(),
                                req.body.userPhone
                            ], function (err, results, fields) {
                                if (err) {
                                    res.send({
                                        success: false,
                                        message: '验证码发送成功,更新失败'
                                    })
                                } else {
                                    res.send({
                                        success: true,
                                        message: '验证码发送成功，更新成功'
                                    })
                                }
                            })
                        } else {
                            //该手机号无验证码记录
                            sqlActions.insertActions.insert(sqlObj.insertCode, {
                                vali_code: code,
                                vali_time: new Date().getTime(),
                                vali_code_phone: req.body.userPhone
                            }, function (err, results, fields) {
                                if (err) {
                                    res.send({
                                        success: false,
                                        message: '验证码发送成功，新增失败'
                                    })
                                } else {
                                    res.send({
                                        success: true,
                                        message: '验证码发送成功,新增成功'
                                    })
                                }
                            })
                        }
                    } else {
                        res.send({
                            success: false,
                            message: smsResult
                        })
                    }
                });
            }
        })
    },
    /*
    *四位随机数
    */
    getRandomCode: function (n) {
        var randomCode = "";
        for (var i = 0; i < n; i++)
            randomCode += Math.floor(Math.random() * 10);
        return randomCode;
    }

}

module.exports = LoginService;