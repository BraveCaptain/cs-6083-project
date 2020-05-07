const express = require('express');
const autoPayInfo = require('../../controller/adminDashboardController');

const autoPay = express.Router();

autoPay.get('/', autoPayInfo.adminGetAutoPayInfo);

module.exports = autoPay;