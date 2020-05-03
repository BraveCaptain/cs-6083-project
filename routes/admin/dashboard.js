const express = require('express');
const adminDashboard = require('../../controller/adminController')

const dashboard = express.Router();


dashboard.get('/',adminDashboard.getUsers);

module.exports = dashboard;