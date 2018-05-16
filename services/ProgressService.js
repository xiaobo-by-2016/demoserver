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
    deleteProStr: `
        DELETE FROM t_progress WHERE progress_id = 
    `,
    getTopicsByTecAccStr: `
    SELECT 
    t.topic_id topicId,
    p.progress_id proId,
    p.progress pro,
    p.progress_content proContent,
    p.progress_time proTime,
    t.student_account studentAccount,
    t.topic_sms_time topicSmsTime
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.student_account = u.user_account
    LEFT JOIN t_progress p on p.progress_topic_id = t.topic_id
    where t.teacher_account = ?
    ORDER BY p.progress_id  DESC
    `,
    getTecTopicIdStr: `
    SELECT 
    t.topic_id topicId,
    t.topic_title topicTitle,
    t.topic_content topicContent,
    t.student_account studentAccount,
    u.user_name  studentName,
    u.user_phone studentPhone
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.student_account = u.user_account
    WHERE t.teacher_account = ?
    `,
    gettopicSms: `
    SELECT t.topic_sms_time topicSmsTime FROM t_topic t WHERE t.topic_id = ?
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
            sqlActions.deleteActions.delete(sqlObj.deleteProStr + req.body.proId, function (err, results, fields) {
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
                                message: '删除返回进度列表',
                                proList: results
                            })
                        }
                    })
                }
            })
        })
    },

    /**
     * teacherAccount
     */
    //教师获取设置的毕业设计题目列表
    getTPByTecAcc: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTopicsByTecAccStr, [
            req.body.teacherAccount
        ], function (err, results1, fields) {

            if (err) {
                res.send({
                    success: false,
                    message: JSON.stringify(err)
                })
            } else {
                sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTecTopicIdStr, [
                    req.body.teacherAccount
                ], function (err, results2, fields) {
                    console.log(results2)
                    if (err) {
                        res.send({
                            success: false,
                            message: JSON.stringify(err)
                        })
                    } else {
                        let proArr = [];
                        for (var index2 in results2) {
                            for (var index1 in results1) {
                                if (results1[index1].topicId == results2[index2].topicId) {
                                    if (results1[index1].studentAccount != null) {
                                        proArr.push(results1[index1])
                                    }

                                }
                            }
                            results2[index2].proList = proArr;
                            proArr = [];
                        }
                        res.send({
                            topicList: results2,
                            success: true,
                            message: '查询成功'
                        })
                    }
                })

            }
        })
    },
    //短信通知
    sendNotify: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.gettopicSms,[
            req.body.topicId
        ],function(err, results, fields){
            if(err){
                res.send({
                    success:false,
                    message:JSON.stringify(err)
                })
            }else{
                SmsService.sendSmsTemplate({
                    name:req.body.studentName,
                    progress:req.body.progress,
                    templateIndex:0,
                    phoneNumbers:req.body.studentPhone
                },function(smsResult){
                    if (JSON.parse(smsResult).Code == 'OK') {
                        res.send({
                            success:true,
                            message:'发送短信通知成功~'
                        })
                    }else{
                        res.send({
                            success:false,
                            message:JSON.stringify(smsResult)
                        })
                    }
                })
            }
        })
    }
}
module.exports = ProgressService;