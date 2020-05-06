const express = require('express');
const pay = require('../../controller/dashboardController');

const autoPay = express.Router();

autoPay.get('/', pay.getAutoPayInfo);

module.exports = autoPay;