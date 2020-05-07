const express = require('express');
const homePayInfo = require('../../controller/adminDashboardController');

const homePay = express.Router();

homePay.get('/', homePayInfo.adminGetHomePayInfo);

module.exports = homePay;