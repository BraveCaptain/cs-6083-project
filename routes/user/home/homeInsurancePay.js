const express = require('express');
const userInsurance = require('../../../controller/homeController');

const insurance = express.Router();

insurance.get('/', userInsurance.getUnpaidHomeInsurances);

insurance.post('/', userInsurance.payHomeInsurance);

module.exports = insurance;