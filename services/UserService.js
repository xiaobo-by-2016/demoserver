var sqlActions = require('../data-base-action/sqlActions');
var CommonService = require('./CommonService');
var sqlObj = {
    updatePasswordStr: 'UPDATE t_user SET user_password = ?  WHERE user_phone = ?',
    //旧密码是否正确
    isOldPass: 'SELECT * FROM t_user WHERE user_phone=? AND user_password=?',
    //用户信息修改
    updateUserInfo: `
    UPDATE t_user SET 
        user_name = ?,
        sex = ?,
        user_college_id = ?,
        email = ?
        WHERE user_phone = ? OR user_account = ?
    `,
    getUserInfoStr:
        `SELECT u.user_id       userId,
        u.user_account      userAccount,
        u.user_phone        userPhone,
        u.user_name         userName,
        u.sex               sex,
        u.email             email,
        c.college_id        collegeId,
        c.college_name      collegeName,
        r.role_id           roleId,
        r.role_name         roleName,
        t.topic_id          topicId,    
        t.topic_title       topicTitle
    FROM        t_user          u
                
    LEFT JOIN   t_role r ON  u.user_role_id = r.role_id 
    LEFT JOIN   t_college_info  c ON     u.user_college_id = c.college_id
    LEFT JOIN   t_topic  t ON     t.student_account = u.user_account
    WHERE     (u.user_account=? OR u.user_phone=?) `,

    getSchoolListStr: `
        SELECT 
        t.college_id collegeId,
        t.college_name collegeName
         FROM t_college_info t
    `
}

var UserService = {
    updatePassword: function (req, res, next) {
        if (req.body.newPassword1 != req.body.newPassword2) {
            res.send({
                success: false,
                message: '两次新密码输入不一致'
            })
        } else {
            var newPassword = req.body.newPassword1;
            sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.isOldPass, [
                req.body.userPhone, req.body.oldPassword
            ], function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    if (results.length == 1) {
                        sqlActions.updateActions.update(sqlObj.updatePasswordStr, [
                            newPassword, req.body.userPhone
                        ], function (err, results, fields) {
                            if (err) {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            } else {
                                res.send({
                                    success: true,
                                    message: '密码修改成功~'
                                })
                            }
                        })
                    } else {
                        res.send({
                            success: false,
                            message: '旧密码输入不正确~'
                        })
                    }
                }
            })
        }

    },
    updateUserInfo: function (req, res, next) {
        var isNull = false;
        for (var prop in req.body) {
            if (req.body[prop] == '') {
                isNull = true;
                res.send({
                    success: false,
                    message: prop + '为空'
                })
                break;
            }
        }
        if (isNull) {
            return;
        }
        sqlActions.updateActions.update(sqlObj.updateUserInfo, [
            req.body.userName,
            req.body.sex,
            req.body.collegeId,
            req.body.email,
            req.body.userPhone,
            req.body.userAccount,
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                sqlActions.queryActions.queryBySqlStringAndValues(
                    sqlObj.getUserInfoStr,
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
                                res.send({
                                    success: true,
                                    userInfo: results,
                                    message: '更新后返回用户信息',
                                })
                            } else {
                                res.send({
                                    success: false,
                                    message: '账号信息不正确',
                                    error: fields
                                })
                            }

                        }
                    })
            }
        })
    },
    getSchoolList: function (req, res, next) {
        CommonService.checkUser(req, res, next, 0, function () {
            sqlActions.queryActions.queryBySqlString(sqlObj.getSchoolListStr, function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    res.send({
                        success: true,
                        message: '高校列表获取成功~',
                        schoolList: results
                    })
                }
            })


        })
    }

}
module.exports = UserService;