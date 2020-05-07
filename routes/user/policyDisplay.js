const express = require('express');
const policyInfo = require('../../controller/policyController');

const policy = express.Router();

policy.get('/', policyInfo.getPolicyInfo);

module.exports = policy;