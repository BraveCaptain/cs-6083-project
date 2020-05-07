const express = require('express');
const auto = require('../../../controller/autoController')

const updateUserInfo = express.Router();

updateUserInfo.get('/', auto.getAutosUpdateInfo);

updateUserInfo.post('/', auto.updateAuto);

module.exports = updateUserInfo;