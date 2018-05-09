var SmsService = require('./SmsService');
var sqlActions = require('../data-base-action/sqlActions');
var CommonService = require('./CommonService');
var sqlObj = {
    addTopicStr: 'INSERT INTO t_topic SET ?',
    getTopicsByTecAccStr: `
    SELECT 
	t.topic_id topicId,
	t.topic_title topicTitle,
	t.topic_content topicContent,
    u.user_name userName,
	u.user_phone studentPhone
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.student_account = u.user_account
    where t.teacher_account = ?`,
    //老师本人题目模糊查询
    getTopicsByKeyStr: `
    SELECT 
	t.topic_id topicId,
	t.topic_title topicTitle,
	t.topic_content topicContent,
    u.user_name userName,
	u.user_phone studentPhone
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.student_account = u.user_account
    where (t.topic_title LIKE `,
    updateTopicStr: `UPDATE t_topic SET student_account = ? WHERE topic_id = ?`,
    //通过高校Id获取该校所有毕设题目(未选)
    getTopicsByCollegeIdStr: `
    SELECT 
	t.topic_id topicId,
	t.topic_title topicTitle,
	t.topic_content topicContent,
    u.user_name teacherName,
	u.user_phone teacherPhone
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.teacher_account = u.user_account
    where t.topic_college_id = ?`,
    //通过学号获取毕设题目（选）
    getTopicsByStuAccStr:`
    SELECT 
	t.topic_id topicId,
	t.topic_title topicTitle,
	t.topic_content topicContent,
    u.user_name teacherName,
	u.user_phone teacherPhone
    FROM t_topic t 
    LEFT JOIN t_user u ON  t.teacher_account = u.user_account
    where t.student_account = ?`,
     //学生题目模糊查询
     getTopicsByStuKeyStr: `
     SELECT 
     t.topic_id topicId,
     t.topic_title topicTitle,
     t.topic_content topicContent,
     u.user_name userName,
     u.user_phone studentPhone
     FROM t_topic t 
     LEFT JOIN t_user u ON  t.student_account = u.user_account
     where (t.topic_title LIKE `,
}

var TopicService = {
    //新增毕设题目（教师）
    addTopic: function (req, res, next) {
        req.body.userAccount = req.body.teacherAccount;
        CommonService.checkUser(req, res, next, 1, function () {
            sqlActions.insertActions.insert(sqlObj.addTopicStr, {
                topic_title: req.body.topicTitle,
                topic_content: req.body.topicContent,
                teacher_account: req.body.teacherAccount,
                topic_college_id: req.body.collegeId
            }, function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTopicsByTecAccStr, [
                        req.body.teacherAccount
                    ], function (err, results, fields) {
                        if (err) {
                            res.send({
                                success: false,
                                message: err
                            })
                        } else {
                            res.send({
                                success: true,
                                message: '新增成功',
                                topicList: results
                            })
                        }
                    })
                }
            })
        })
    },
    //教师获取设置的毕业设计题目列表
    getTopicsByTecAcc: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTopicsByTecAccStr, [
            req.body.teacherAccount
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                res.send({
                    success: true,
                    message: '查询成功',
                    topicList: results
                })
            }
        })
    },
    //教师本人毕设题目模糊查询
    getTopicsByKey: function (req, res, next) {
        var sqlStr = sqlObj.getTopicsByKeyStr +
            `"%${req.body.strkey}%" OR t.topic_content LIKE "%${req.body.strkey}%") 
         AND 
         teacher_account = ${req.body.teacherAccount} `;

        sqlActions.queryActions.queryBySqlString(sqlStr,
            function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    res.send({
                        success: true,
                        message: '模糊查询成功',
                        topicList: results
                    })
                }
            })
    },
    //学生选取毕设题目
    selectTopic: function (req, res, next) {
        req.body.userAccount = req.body.studentAccount;
        CommonService.checkUser(req, res, next, 2, function () {
            sqlActions.updateActions.update(sqlObj.updateTopicStr, [
                req.body.studentAccount,req.body.topicId
            ], function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTopicsByStuAccStr, [
                        req.body.studentAccount
                    ], function (err, results, fields) {
                        if (err) {
                            res.send({
                                success: false,
                                message: err
                            })
                        } else {
                            res.send({
                                success: true,
                                message: '选取毕设题目后,通过学号获取毕设题目列表成功',
                                topicList: results
                            })
                        }
                    })
                }
            })
        })
    },
    //通过高校Id获取所有的毕业题目
    getTopicsByCollegeId:function(req, res, next){
        sqlActions.queryActions.queryBySqlStringAndValues(sqlObj.getTopicsByCollegeIdStr, [
            req.body.collegeId
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                res.send({
                    success: true,
                    message: '查询成功',
                    topicList: results
                })
            }
        })
    },
    //学生题目模糊查询列表
    getTopicsByStuKey: function (req, res, next) {
        var sqlStr = sqlObj.getTopicsByStuKeyStr +
            `"%${req.body.strkey}%" OR t.topic_content LIKE "%${req.body.strkey}%") 
         AND 
         topic_college_id = ${req.body.collegeId} `;

        sqlActions.queryActions.queryBySqlString(sqlStr,
            function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                } else {
                    res.send({
                        success: true,
                        message: '学生模糊查询成功',
                        topicList: results
                    })
                }
            })
    }
}
module.exports = TopicService;