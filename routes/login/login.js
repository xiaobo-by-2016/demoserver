/**
 * Created by xiaobo on 2018/4/23.
 */
var express = require('express');
var router = express.Router();
var sqlActions = require('../../mysql/sqlActions');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var sql = 'select * from user'
    sqlActions.queryActions.queryBySqlString(sql,function(err,results,fields){
        res.send(results)
    })
});

module.exports = router;
