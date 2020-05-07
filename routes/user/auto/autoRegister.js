const express = require('express');
const userAuto = require('../../../controller/autoController');

const auto = express.Router();

auto.get('/', (req, res) => {
    res.render('user/autoRegister');
})
auto.post('/',userAuto.createAuto);

module.exports = auto;