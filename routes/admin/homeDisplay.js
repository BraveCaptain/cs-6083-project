const express = require('express');
const homeInfo = require('../../controller/adminDashboardController');

const home = express.Router();

home.get('/', homeInfo.adminGetHomeInfo);
home.post('/', homeInfo.adminDeleteHome);

module.exports = home;