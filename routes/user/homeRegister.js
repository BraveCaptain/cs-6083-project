const express = require('express');
const userHome = require('../../controller/dashboardController');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('user/homeRegister');
})
home.post('/',userHome.createHome);

module.exports = home;