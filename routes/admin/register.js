const express = require('express');
const adminController = require('../../controller/adminController')

const register = express.Router();

register.get('/',(req, res) =>{
    res.render('admin/register');
});

register.post('/', adminController.createAdmin);

module.exports = register;