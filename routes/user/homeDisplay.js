const express = require('express');
const userHome = require('../../controller/dashboardController');

const home = express.Router();

home.get('/', userHome.getHomesInfo);

module.exports = home;