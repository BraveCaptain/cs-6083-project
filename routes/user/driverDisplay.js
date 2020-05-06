const express = require('express');
const userDriver = require('../../controller/dashboardController');

const driver = express.Router();

driver.get('/', userDriver.getDriverInfo);

module.exports = driver;