const express = require('express');
const home = require('../../../controller/homeController')

const updateUserInfo = express.Router();

updateUserInfo.get('/', home.getHomesUpdateInfo);

updateUserInfo.post('/', home.updateHome);

module.exports = updateUserInfo;