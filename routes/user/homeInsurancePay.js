const express = require('express');
const userInsurance = require('../../controller/dashboardController');

const insurance = express.Router();

insurance.get('/', userInsurance.getUnpaidHomeInsurance);

insurance.post('/', userInsurance.payHomeInsurance);

module.exports = insurance;