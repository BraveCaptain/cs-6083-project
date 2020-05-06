const express = require('express');
const invoice = require('../../controller/dashboardController');

const homeInvoice = express.Router();

homeInvoice.get('/', invoice.getHomeInvoiceInfo);

module.exports = homeInvoice;