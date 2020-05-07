const express = require('express');
const userController = require('../../controller/adminDashboardController')

const policyRegister = express.Router();

policyRegister.get('/',(req, res) =>{
    res.render('admin/adminPolicyRegister');
});

policyRegister.post('/', userController.adminCreatePolicy);

module.exports = policyRegister;