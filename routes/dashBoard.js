const express = require('express');
const userController = require('../controller/userController')

const dashBoard = express.Router();

dashBoard.get('/',(req, res) =>{
    res.render('register');
});


module.exports = dashBoard;