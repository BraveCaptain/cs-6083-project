const express = require('express');
const userAuto = require('../../../controller/autoController');

const auto = express.Router();

auto.get('/', userAuto.getAutosInfo);

module.exports = auto;