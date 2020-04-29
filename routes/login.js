const express = require('express');

const login = express.Router();

login.get('/',(req, res) =>{
    //res.send('welcome to login page');
    res.render('login');
});

module.exports = login;