const express = require('express');
const userController = require('../../controller/userController')

const updateUserInfo = express.Router();

updateUserInfo.get('/',(req, res) =>{
    res.render('user/userProfileUpdate');
});

updateUserInfo.post('/', userController.updateUserProfile);

module.exports = updateUserInfo;