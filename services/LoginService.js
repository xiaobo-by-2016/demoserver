var SmsService = require('./SmsService');
var sqlActions = require('../data-base-action/sqlActions');
var sqlObj = {
    //登陆后返回用户信息
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
    //新用户注册
    registerStr: `INSERT INTO t_user SET ?`,
    //验证账号/手机首是否已经注册
    isRegisterStr: `SELECT * FROM t_user WHERE user_account=? OR user_phone=?`,
    //验证码是否正确
    isCodeValStr: `SELECT * FROM t_vali_code WHERE vali_code_phone=? AND vali_code=?`,
    //该手机是否存在验证码记录  获取验证码使用
    isValiCodeStr: `SELECT * FROM t_vali_code WHERE vali_code_phone =?`,
    //更新验证码
    updateCode: `UPDATE t_vali_code SET vali_code = ? ,vali_time =? WHERE vali_code_phone = ?`,
    //新增验证码
    insertCode: `INSERT INTO t_vali_code SET ?`,
    //更新密码
    updatePassword: 'UPDATE t_user SET user_password = ?  WHERE user_phone = ?'

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
        sqlActions.queryActions.queryBySqlStringAndValues(
            sqlObj.isRegisterStr,
            [
                req.body.userAccount,
                req.body.userPhone,
            ], function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    if (results.length == 1) {
                        //账号已经存在
                        res.send({
                            success: true,
                            status: '1',
                            message: '学号/工号/手机号已经存在'
                        })
                    }
                    else {
                        //验证验证码的有效性
                        sqlActions.queryActions.queryBySqlStringAndValues(
                            sqlObj.isCodeValStr, [
                                req.body.userPhone,
                                req.body.code
                            ], function (err, results, fields) {
                                if (err) {
                                    res.send({
                                        success: false,
                                        message: err
                                    })
                                } else {

                                    if (results.length == 1) {
                                        //验证验证是否过期
                                        var codeTime = new Date().getTime();
                                        if (((codeTime - results[0].vali_time) / (1000 * 60)) > 10000) {
                                            res.send({
                                                success: false,
                                                message: '验证码已失效'
                                            })
                                        } else {
                                            //新增用户
                                            sqlActions.insertActions.insert(sqlObj.registerStr, {
                                                user_account: req.body.userAccount,
                                                user_password: req.body.userPassword,
                                                user_phone: req.body.userPhone,
                                                user_role_id: req.body.userRoleId
                                            }, function (err, results, fields) {
                                                if (err) {
                                                    res.send({
                                                        success: false,
                                                        message: err,
                                                    })
                                                } else {
                                                    res.send({
                                                        success: true,
                                                        message: '注册成功'
                                                    })
                                                }
                                            })
                                        }

                                    } else {
                                        res.send({
                                            success: false,
                                            message: '请确认手机号和验证码是否输入正确'
                                        })
                                    }
                                }
                            })
                    }
                }
            })



    },
    findPassword: function (req, res, next) {
        var isNull = false;
        for(var prop in req.body){
            if(req.body[prop]==''){
                isNull = true;
                res.send({
                    success:false,
                    message:prop+'为空'
                })
                break;
            }
        }
        if(isNull){
            return;
        }
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.isRegisterStr, [
            '', req.body.userPhone
        ], function (err, results, fields) {
            
            if (err) {
                res.send({
                    success: false,
                    message: err,
                })
            } else {
                if (results.length == 0) {
                    res.send({
                        success: false,
                        message: '该手机号未注册',
                    })
                } else {
                    //验证验证码的有效性
                    sqlActions.queryActions.queryBySqlStringAndValues(
                        sqlObj.isCodeValStr, [
                            req.body.userPhone,
                            req.body.code
                        ], function (err, results, fields) {
                            if (err) {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            } else {
                                if (results.length == 1) {
                                    //验证验证是否过期
                                    var codeTime = new Date().getTime();
                                    if (((codeTime - results[0].vali_time) / (1000 * 60)) > 10000) {
                                        res.send({
                                            success: false,
                                            message: '验证码已失效'
                                        })
                                    } else {
                                        if (req.body.password1 == req.body.password2) {
                                            //密码更新
                                            sqlActions.updateActions.update(sqlObj.updatePassword, [
                                                req.body.password1,
                                               req.body.userPhone
                                            ], function (err, results, fields) {
                                                if (err) {
                                                    res.send({
                                                        success: false,
                                                        message: err,
                                                    })
                                                } else {
                                                    res.send({
                                                        success: true,
                                                        message: '密码找回成功'
                                                    })
                                                }
                                            })
                                        } else {
                                            res.send({
                                                success: false,
                                                message: '两次密码输入不一致'
                                            })
                                        }
                                    }

                                } else {
                                    res.send({
                                        success: false,
                                        message: '请确认手机号和验证码是否输入正确'
                                    })
                                }
                            }
                        })
                }
            }
        })

    },
    /*
    *验证码
    *1）验证表中改该手机号是否存在记录，无->新增   有->更新
    *2）发送短信成功后 更新码值
        参数： userPhone:目标手机号  smsActnStat： 1：注册  2：找回
    */
    sendSmsCode: function (req, res, next) {
        if(req.body.smsActnStat == 2){
            sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.isRegisterStr,[
                '',req.body.userPhone
            ],function(err, results, fields){
                if(err){
                    res.send({
                        success:false,
                        message:err
                    })
                }else{
                    if(results.length == 1){
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
                                                        message: err
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
                                                        message: err
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
                    }else{
                        res.send({
                            success:false,
                            message:'手机号未注册'
                        })
                    }
                }
            })
        }else{
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
                                            message: err
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
                                            message: err
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
        }
        
        
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