const express = require('express');
const userInsurance = require('../../controller/dashboardController');

const insurance = express.Router();

insurance.get('/', userInsurance.getHomeInsurancesInfo);

insurance.post('/', userInsurance.createHomeInsurance)

module.exports = insurance;