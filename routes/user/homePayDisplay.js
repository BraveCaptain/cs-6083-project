const express = require('express');
const pay = require('../../controller/dashboardController');

const homePay = express.Router();

homePay.get('/', pay.getHomePayInfo);

module.exports = homePay;