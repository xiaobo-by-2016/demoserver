/**
 * Created by xiaobo on 2018/4/23.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});

var sqlActions = {
    //查询操作
    queryActions: {
        /*
        * sqlString:SELECT * FROM `books` WHERE `author` = "David"
        * callback:回调函数
        * */
        queryBySqlString: function (sqlString, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(sqlString, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        },
        /*
        * sqlString：SELECT * FROM `books` WHERE `author` = ?
        * values： ['David']
        * */
        queryBySqlStringAndValues: function (sqlString, values, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(sqlString, values, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        },
        /*
        * */
        queryByOptions: function (options, callback) {
            /* {
                 sql: 'SELECT * FROM `books` WHERE `author` = ?',
                 timeout: 40000, // 40s
                 values: ['David']
             }*/
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(options, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        }
    },
    //插入
    insertActions: {
        /*
        *INSERT INTO posts SET ?
        *  post  = {id: 1, title: 'Hello MySQL'};
        * */
        insert: function (sqlString, obj, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(sqlString, obj, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        }
    },
    //更新
    updateActions: {
        /*
        *UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?
        * ['a', 'b', 'c', userId]
        * */
        update: function (sqlString, values, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(sqlString, values, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        }
    },
    //删除
    deleteActions: {
        /*
         sqlString 删除
        * */
        delete: function (sqlString, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err, null, null);
                } else {
                    connection.query(sqlString, function (err, results, fields) {
                        //释放连接
                        connection.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            })
        }
    }
};
module.exports = sqlActions;
