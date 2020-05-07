const express = require('express');
const policyInfo = require('../../controller/adminDashboardController');

const policy = express.Router();

policy.get('/', policyInfo.adminGetPolicyInfo);

module.exports = policy;