const express = require('express');
const userInsurance = require('../../controller/dashboardController');

const insurance = express.Router();

insurance.get('/', userInsurance.getUnpaidAutoInsurances);

insurance.post('/', userInsurance.payAutoInsurance);

module.exports = insurance;