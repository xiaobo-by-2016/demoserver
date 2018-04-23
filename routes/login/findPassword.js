var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('忘记密码');
});

module.exports = router;
