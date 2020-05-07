const express = require('express');
const driver = require('../../../controller/driverController')

const updateUserInfo = express.Router();

updateUserInfo.get('/', driver.getDriversUpdateInfo);

updateUserInfo.post('/', driver.updateDriver);

module.exports = updateUserInfo;