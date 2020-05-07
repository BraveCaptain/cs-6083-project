const express = require('express');
const userInfo = require('../../controller/adminDashboardController');

const user = express.Router();

user.get('/', userInfo.adminGetUserInfo);

user.post('/', userInfo.adminDeleteUser);

module.exports = user;