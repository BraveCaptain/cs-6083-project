const express = require('express');
const userDashboard = require('../../controller/dashboardController')

const dashboard = express.Router();


dashboard.get('/',userDashboard.getUserInfo);


module.exports = dashboard;