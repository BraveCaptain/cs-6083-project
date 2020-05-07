const express = require('express');
const pay = require('../../../controller/homeController');

const homePay = express.Router();

homePay.get('/', pay.getHomePayInfo);

module.exports = homePay;