const express = require('express');
const homeInvoiceInfo = require('../../controller/adminDashboardController');

const homeInvoice = express.Router();

homeInvoice.get('/', homeInvoiceInfo.adminGetHomeInvoiceInfo);

module.exports = homeInvoice;