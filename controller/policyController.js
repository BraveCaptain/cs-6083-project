const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getPolicyInfo = getPolicyInfo;

function getPolicyInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select policyid, type, policyname, amount from policy';
		connection.query(sql, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			policyInfo = result;
			common.correctUserInfo(policyInfo);
			//console.log(userInfo);
			res.render('user/policyDisplay', {
				policyInfo: policyInfo
			});
		});
	});
}