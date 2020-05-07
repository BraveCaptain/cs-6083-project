const express = require('express');
const homeInfo = require('../../controller/adminDashboardController');

const home = express.Router();

home.get('/', homeInfo.adminGetHomeInfo);

module.exports = home;