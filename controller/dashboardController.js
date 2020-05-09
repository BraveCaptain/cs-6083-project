const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getUserInfo = getUserInfo;

function getUserInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, fname, lname, state, city, street, zipcode, gender, maritalstatus from user where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			if (result.length == 0) {
				console.log('no such user');
				res.render('error', 
					'no such user'
				);
				return;
			}
			userInfo = result[0];
			//common.correctUserInfo(userInfo);
			//console.log(userInfo);
			res.render('user/dashboard', {
				userInfo: userInfo
			});
		});
	});
}
