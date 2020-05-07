const express = require('express');
const adminController = require('../../controller/adminController')

const logout = express.Router();

logout.get('/',adminController.logoutAdmin);

module.exports = logout;