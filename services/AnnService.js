var SmsService = require('./SmsService');
var sqlActions = require('../data-base-action/sqlActions');

var slqObj = {
    addAnnStr: `
    INSERT INTO t_ann SET ?
    `,
    getAnnListByTecAccStr: `
    SELECT 
    a.ann_id    annId,
    a.ann_title annTitle,
    a.ann_content annContent,
    a.ann_time annTime,
    a.ann_tecaher_account annTecAcc
    FROM t_ann a  
    WHERE a.ann_tecaher_account = ?
    `,
    getAnnListByTopicIdStr: `
    SELECT  
    a.ann_id    annId,
    a.ann_content   annContent,
    a.ann_title annTitle,
    a.ann_tecaher_account annTecAcc,
    a.ann_time annTitle
    FROM t_ann a
    LEFT JOIN t_topic t
    on t.teacher_account = a.ann_tecaher_account
    WHERE t.topic_id = ?
    `,
    deleteAnnByIdStr: `
    DELETE FROM t_ann WHERE ann_id = 
    `
}
var AnnService = {

    deleteAnnById: function (req, res, next) {
        sqlActions.deleteActions.delete(slqObj.deleteAnnByIdStr + req.body.annId,
            function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: JSON.stringify(err)
                    })
                } else {
                    res.send({
                        success: true,
                        message: '公告删除成功',
                    })
                }
            })
    },
    //学生获取公告列表
    getAnnListByTopicId: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(slqObj.getAnnListByTopicIdStr, [
            req.body.topicId
        ], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    message: JSON.stringify(err)
                })
            } else {
                res.send({
                    success: true,
                    message: '获取公告列表成功',
                    annList: results
                })
            }
        })
    },
    //教师获取公告列表
    getAnnListByTecAcc: function (req, res, next) {
        sqlActions.queryActions.queryBySqlStringAndValues(slqObj.getAnnListByTecAccStr, [
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
                    message: '获取公告列表成功',
                    annList: results
                })
            }
        })
    },
    //新增公告
    addAnn: function (req, res, next) {
        if (req.body.roleId == 1) {
            sqlActions.insertActions.insert(slqObj.addAnnStr, {
                ann_title: req.body.annTitle,
                ann_content: req.body.annContent,
                ann_time: req.body.annTime,
                ann_tecaher_account: req.body.userAccount
            }, function (err, results, fields) {
                if (err) {
                    res.send({
                        success: false,
                        message: JSON.stringify(err)
                    })
                } else {
                    res.send({
                        success: true,
                        message: '新增公告成功'
                    })
                }
            })
        } else {
            res.send({
                success: false,
                message: '用户无此权限'
            })
        }

    }
}
module.exports = AnnService;

