const express = require('express');
const userController = require('../../controller/userController')

const logout = express.Router();

logout.get('/',userController.logoutUser);

module.exports = logout;