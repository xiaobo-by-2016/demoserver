var SmsService = require('./SmsService');
var sqlActions = require('../data-base-action/sqlActions');
var CommonService = require('./CommonService');

var sqlObj = {
    // 进度新增
    addProgressStr: `INSERT INTO t_progress SET ?`,
    //获取进度列表（学生）
    getProListStr: `
        SELECT 
        p.progress_id           proId,
        p.progress              pro,
        p.progress_content      proContent,
        p.progress_time         proTime
        FROM  t_progress p
        WHERE 
        p.progress_account = ?
        ORDER BY p.progress DESC
    `,
    deleteProStr:`
        DELETE FROM t_progress WHERE progress_id = 
    `

}

var ProgressService = {
    /**
     * userAccount   progress_account  关联学生的账号 (userAccount)
     * progress  进度
     * progressContent  进度详情
     * progressTime 时间
     * progressTopicId
     */
    addProgress: function (req, res, next) {
        CommonService.checkUser(req, res, next, 2, function () {
            sqlActions.insertActions.insert(sqlObj.addProgressStr, {
                progress: req.body.progress,
                progress_content: req.body.progressContent,
                progress_time: req.body.progressTime,
                progress_topic_id: req.body.progressTopicId,
                progress_account: req.body.userAccount
            }, function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: JSON.stringify(err)
                    })
                } else {
                    sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getProListStr, [
                        req.body.userAccount
                    ], function (err, results, fields) {
                        if (err) {
                            res.send({
                                success: false,
                                message: JSON.stringify(err)
                            })
                        } else {
                            res.send({
                                success: true,
                                message: '新增返回进度列表',
                                proList: results
                            })
                        }
                    })
                }
            })
        })
    },


    /**
     * userAccount
     */
    getProList: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getProListStr, [
            req.body.userAccount
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: JSON.stringify(err)
                })
            } else {
                res.send({
                    success: true,
                    message: '新增返回进度列表',
                    proList: results
                })
            }
        })

    },

    /**
     * userAccount
     * proId
     */
    deletePro: function (req, res, next) {
        CommonService.checkUser(req, res, next, 2, function () {
            sqlActions.deleteActions.delete(sqlObj.deleteProStr+req.body.proId,function(err, results, fields){
                if(err){
                    res.send({
                        success:false,
                        message:JSON.stringify(err)
                    })
                }else{
                    sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getProListStr, [
                        req.body.userAccount
                    ], function (err, results, fields) {
                        if (err) {
                            res.send({
                                success: false,
                                message: JSON.stringify(err)
                            })
                        } else {
                            res.send({
                                success: true,
                                message: '删除返回进度列表',
                                proList: results
                            })
                        }
                    })
                }
            })
        })
    }
}
module.exports = ProgressService;