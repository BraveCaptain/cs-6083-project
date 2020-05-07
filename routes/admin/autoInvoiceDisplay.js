const express = require('express');
const autoInvoiceInfo = require('../../controller/adminDashboardController');

const autoInvoice = express.Router();

autoInvoice.get('/', autoInvoiceInfo.adminGetAutoInvoiceInfo);

module.exports = autoInvoice;