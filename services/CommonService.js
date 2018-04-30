var sqlActions = require('../data-base-action/sqlActions');

var sqlObj = {
    isUserStr: 'SELECT * FROM t_user WHERE user_account = ? OR user_phone = ?',
}
var CommonService = {
    checkUser: function (req, res, next, role, callback) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.isUserStr, [
            req.body.userAccount, req.body.userPhone
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                if (results.length == 1) {
                    if (results[0].user_role_id == role) {
                        callback();
                    } else {
                        res.send({
                            success: false,
                            message: '用户无此权限'
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: '用户不存在'
                    })
                }
            }
        })
    }
}
module.exports = CommonService;