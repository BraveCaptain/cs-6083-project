const express = require('express');
const invoice = require('../../controller/dashboardController');

const autoInvoice = express.Router();

autoInvoice.get('/', invoice.getAutoInvoiceInfo);

module.exports = autoInvoice;