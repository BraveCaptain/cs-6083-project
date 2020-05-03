const express = require('express');
const userController = require('../../controller/userController')

const register = express.Router();

register.get('/',(req, res) =>{
    res.render('user/register');
});

register.post('/', userController.createUser);

module.exports = register;