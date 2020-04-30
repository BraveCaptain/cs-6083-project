const express = require('express');


const register = express.Router();

register.get('/',(req, res) =>{
    res.render('register');
});

module.exports = register;