const express = require('express');
const autoInfo = require('../../controller/adminDashboardController');

const auto = express.Router();

auto.get('/', autoInfo.adminGetAutoInfo);

module.exports = auto;