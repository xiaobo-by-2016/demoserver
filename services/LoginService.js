var express = require('express');
var router = express.Router();
router.post
var LoginService = {
    login: function (req, res, next) {

        res.send('login');

    },
    register: function (req, res, next) {

        res.send('register');

    },
    findPassword: function (req, res, next) {

        res.send('findPassword');

    },
}

module.exports = LoginService;