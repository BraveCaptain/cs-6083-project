const express = require('express');
const userHome = require('../../../controller/homeController');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('user/home/homeRegister');
})
home.post('/',userHome.createHome);

module.exports = home;