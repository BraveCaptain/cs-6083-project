const express = require('express');
const userDashboard = require('../../controller/userController')

const dashboard = express.Router();


dashboard.get('/',userDashboard.getUserInfo);


module.exports = dashboard;