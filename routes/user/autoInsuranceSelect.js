const express = require('express');
const autoInsurance = require('../../controller/dashboardController');

const insurance = express.Router();

insurance.get('/', autoInsurance.getAutoInsurancesInfo);

insurance.post('/', autoInsurance.createAutoInsurance)

module.exports = insurance;