const express = require('express');
const userHome = require('../../controller/homeController')

const home = express.Router();


home.get('/',userHome.getHomeInfo);

module.exports = home;