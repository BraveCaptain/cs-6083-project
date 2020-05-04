const express = require('express');
const userAuto = require('../../controller/dashboardController');

const auto = express.Router();

auto.get('/', userAuto.getAutosInfo);

module.exports = auto;