const express = require('express');
const adminController = require('../../controller/adminController')

const adminLogin = express.Router();

adminLogin.get('/',(req, res) =>{
    res.render('admin/login');
});

adminLogin.post('/', adminController.loginAdmin);

module.exports = adminLogin;