const express = require('express');
const userController = require('../controller/userController')

const login = express.Router();

login.get('/',(req, res) =>{
    res.render('login');
});

login.post('/', userController.loginUser);

module.exports = login;