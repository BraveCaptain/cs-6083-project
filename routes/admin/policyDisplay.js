const express = require('express');
const policyInfo = require('../../controller/adminDashboardController');

const policy = express.Router();

policy.get('/', policyInfo.adminGetPolicyInfo);
policy.post('/', policyInfo.adminDeletePolicy);

module.exports = policy;