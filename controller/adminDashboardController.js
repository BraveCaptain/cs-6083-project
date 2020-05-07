const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.adminGetUserInfo = adminGetUserInfo;
exports.adminGetPolicyInfo = adminGetPolicyInfo;
exports.adminCreatePolicy = adminCreatePolicy;
exports.adminGetHomeInfo = adminGetHomeInfo;
exports.adminGetAutoInfo = adminGetAutoInfo;
exports.adminGetHomeInvoiceInfo = adminGetHomeInvoiceInfo;
exports.adminGetAutoInvoiceInfo = adminGetAutoInvoiceInfo;
exports.adminGetHomePayInfo = adminGetHomePayInfo;
exports.adminGetAutoPayInfo = adminGetAutoPayInfo;
exports.adminGetDriverInfo = adminGetDriverInfo;

function adminGetUserInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, fname, lname, state, city, street, zipcode, gender, maritalstatus from user';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminUserInfo = result;
			common.correctUserInfo(adminUserInfo);
			//console.log(userInfo);
			res.render('admin/adminUserDisplay', {
            adminUserInfo: adminUserInfo
            });
		});
    });
}

function adminGetPolicyInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select policyid, type, policyname, amount from policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminPolicyInfo = result;
			common.correctUserInfo(adminPolicyInfo);
			//console.log(userInfo);
			res.render('admin/adminPolicyDisplay', {
                adminPolicyInfo: adminPolicyInfo
            });
		});
    });
}

function adminCreatePolicy(req, res, next) {
	console.log('enter function adminCreatePolicy');
	console.log(req.body);
	const type = xss(req.body.type);
	const policyname = xss(req.body.policyname);
	const amount = xss(req.body.amount);
	//verify
	database.setUpDatabase(function (connection) {
		connection.connect();
		//issue: home name
		var sql = 'select * from policy where policy.policyname = ?';
		connection.query(sql, policyname, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			if (result.length > 0) {
				console.log('Already exists same policy name: ', autoname);
				res.send('Already exists same policy name');
				return;
			}
			var addSqlParams = [type, policyname, amount];
			console.log(addSqlParams);
			var addSql = 'insert into policy (type, policyname, amount) values (?, ?, ?)';
			connection.query(addSql, addSqlParams, function (err, result) {
				if (err) {
					console.log('[INSERT ERROR] - ', err.message)
					res.send("SQL insert error");
					return;
				}
				console.log('--------------------------INSERT----------------------------')
				console.log('INSERT ID:', result)
				console.log('------------------------------------------------------------')
				//issue 01: 注册成功alert
				connection.end();
				res.redirect(301, '/admin/dashboard');
			})
		})
	})
}

function adminGetHomeInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select homeid, homename, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, userid from home';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomeInfo = result;
			common.correctUserInfo(adminHomeInfo);
			//console.log(userInfo);
			res.render('admin/adminHomeDisplay', {
                adminHomeInfo: adminHomeInfo
            });
		});
    });
}

function adminGetAutoInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select vin, autoname, modeldate, status, userid from auto';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoInfo = result;
			common.correctUserInfo(adminAutoInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoDisplay', {
                adminAutoInfo: adminAutoInfo
            });
		});
    });
}

function adminGetHomeInvoiceInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select userid, hpid, paymentduedate, amount, (amount-amountpaid)leftamount from home_policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomeInvoiceInfo = result;
			common.correctUserInfo(adminHomeInvoiceInfo);
			//console.log(userInfo);
			res.render('admin/adminHomeInvoiceDisplay', {
                adminHomeInvoiceInfo: adminHomeInvoiceInfo
            });
		});
    });
}

function adminGetAutoInvoiceInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select userid, apid, paymentduedate, amount, (amount-amountpaid)leftamount from auto_policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoInvoiceInfo = result;
			common.correctUserInfo(adminAutoInvoiceInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoInvoiceDisplay', {
                adminAutoInvoiceInfo: adminAutoInvoiceInfo
            });
		});
    });
}

function adminGetHomePayInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select paymentid, paymentdate, method, hpid, amount, userid from hpayment';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomePayInfo = result;
			common.correctUserInfo(adminHomePayInfo);
			//console.log(userInfo);
			res.render('admin/adminHomePayDisplay', {
                adminHomePayInfo: adminHomePayInfo
            });
		});
    });
}


function adminGetAutoPayInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select paymentid, paymentdate, method, apid, amount, userid from apayment';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoPayInfo = result;
			common.correctUserInfo(adminAutoPayInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoPayDisplay', {
                adminAutoPayInfo: adminAutoPayInfo
            });
		});
    });
}

function adminGetDriverInfo(req, res, next) { 
    const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, licensenum, fname, lname, vin, autoname, birthdate from driver';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
			adminDriverInfo = result;
			console.log(adminDriverInfo);

			res.render('admin/adminDriverDisplay', {
				adminDriverInfo: adminDriverInfo
			});
		});
	});
}