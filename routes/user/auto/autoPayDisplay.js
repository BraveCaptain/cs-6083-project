const express = require('express');
const pay = require('../../../controller/autoController');

const autoPay = express.Router();

autoPay.get('/', pay.getAutoPayInfo);

module.exports = autoPay;