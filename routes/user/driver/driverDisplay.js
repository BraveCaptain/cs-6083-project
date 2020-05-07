const express = require('express');
const userDriver = require('../../../controller/driverController');

const driver = express.Router();

driver.get('/', userDriver.getDriverInfo);

module.exports = driver;