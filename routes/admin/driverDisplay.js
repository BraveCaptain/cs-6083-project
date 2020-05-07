const express = require('express');
const driverInfo = require('../../controller/adminDashboardController');

const driver = express.Router();

driver.get('/', driverInfo.adminGetDriverInfo);

module.exports = driver;