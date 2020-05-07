const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.updateAuto = updateAuto;
exports.getAutosUpdateInfo = getAutosUpdateInfo;
exports.getAutosInfo = getAutosInfo;
exports.createAuto = createAuto;
exports.getAutoInsurancesInfo = getAutoInsurancesInfo;
exports.createAutoInsurance = createAutoInsurance;
exports.getUnpaidAutoInsurances = getUnpaidAutoInsurances;
exports.payAutoInsurance = payAutoInsurance;

exports.getAutoInvoiceInfo = getAutoInvoiceInfo;
exports.getAutoPayInfo = getAutoPayInfo;

function createAuto(req, res, next) {
	console.log('enter function createAuto');
	console.log(req.body);
	const userid = xss(req.session.userid);
	const modeldate = xss(req.body.modeldate);
	const status = xss(req.body.status);
	const autoname = xss(req.body.autoname);
	const vin = xss(req.body.vin);
	console.log(Date.parse(modeldate));
	//verify
	database.setUpDatabase(function (connection) {
		connection.connect();
		//issue: home name
		var sql = 'select * from auto where auto.autoname = ?';
		connection.query(sql, autoname, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			if (result.length > 0) {
				console.log('Already exists same auto name: ', autoname);
				res.send('Already exists same auto name');
				return;
			}
			var addSqlParams = [autoname, vin, userid, modeldate, status];
			console.log(addSqlParams);
			var addSql = 'insert into auto (autoname, vin, userid, modeldate, status) values (?, ?, ?, ?, ?)';
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
				res.redirect(301, '/dashboard');
			})
		})
	})
}

function getAutoInvoiceInfo(req, res, next) { 
    const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select apid, paymentduedate, amount, (amount-amountpaid)leftamount from auto_policy where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
			autoInvoiceInfo = result;
			console.log(autoInvoiceInfo);

			res.render('user/auto/autoInvoiceDisplay', {
				autoInvoiceInfo: autoInvoiceInfo
			});
		});
	});
}

function getAutoPayInfo(req, res, next) { 
    const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select paymentid, paymentdate, method, apid, amount from apayment where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
			autoPayInfo = result;
			console.log(autoPayInfo);

			res.render('user/auto/autoPayDisplay', {
				autoPayInfo: autoPayInfo
			});
		});
	});
}

function getAutosUpdateInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
        var sql = 'select autoname, vin from auto where userid = ?'
        connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			autoInfo = result;
			console.log(autoInfo);
			res.render('user/auto/autoUpdate', {
				autoInfo: autoInfo
			});
		});
	});
}

function updateAuto(req, res, next) {
    console.log(req.body);
    const userid = xss(req.session.userid);
	const modeldate = xss(req.body.modeldate);
    const autoname = xss(req.body.autoname);
    const vin = xss(req.body.vin);
    const status = xss(req.body.status);
	//verify
	database.setUpDatabase(function (connection) {
        console.log('here')
		connection.connect();
		//issue: auto name
		var sql = 'select * from auto where autoname = ? and userid = ?';
		connection.query(sql, [autoname, userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			if (result.length > 0) {
				console.log('already exist autoname: ', autoname);
				res.send("already exist autoname");
				return;
            }
            sql = 'update auto set autoname = ?, modeldate = ?, status = ? where vin = ?';
			var addSqlParams = [autoname, modeldate, status, vin];
                
			connection.query(sql, addSqlParams, function (err, result) {
				if (err) {
					console.log('[INSERT ERROR] - ', err.message)
					res.send("SQL update error");
					return;
				}
				console.log('--------------------------INSERT----------------------------')
				console.log('INSERT ID:', result)
				console.log('------------------------------------------------------------')
				//issue 01: 注册成功alert
				connection.end();
				res.redirect(301, '/dashboard');
			})
		})
	})
}




function payAutoInsurance(req, res, next) {
	const userid = xss(req.session.userid);
	const method = xss(req.body.method);
	const apid = xss(req.body.apid);
	const paymentAmount = xss(req.body.amount);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var amountsql = 'select (amount-amountpaid)leftamount from auto_policy where auto_policy.apid = ?';
		connection.query(amountsql, [apid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			var leftamount = result[0].leftamount;
			if (paymentAmount > leftamount) {
				console.log('pay too much');
				res.send('payment amount is greater than remaining amount');
				return;
			}
			else {
				var sql = 'insert into apayment (userid, paymentdate, method, apid, amount) values (?, NOW(), ?, ?, ?)';
				connection.query(sql, [userid, method, apid, paymentAmount], function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else {
						console.log('--------------------------INSERT----------------------------')
						console.log('INSERT ID:', result)
						console.log('------------------------------------------------------------')
						sql = 'update auto_policy set amountpaid = amountpaid + ? where apid = ?';
						connection.query(sql, [paymentAmount, apid], function (err, result) {
							if (err) {
								console.log('[SELECT ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							} else {
								console.log('payment success');
								connection.end();
								res.redirect(301, '/dashboard');
							}
						});
					}
				});
			}
		});
	});
}

function getUnpaidAutoInsurances(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select apid, (amount-amountpaid)leftamount, amountpaid, paymentduedate, autoname, policyname from auto_policy where auto_policy.userid = ? and auto_policy.amountpaid < auto_policy.amount';
		connection.query(sql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				console.log('no unpaid invoice');
				res.send('no unpaid invoice');
				return;
			} else {
				console.log(result);
				var unpaidAutoInsurancesInfo = result;
				connection.end();
				res.render('user/auto/autoInsurancePay', {
					unpaidAutoInsurancesInfo: unpaidAutoInsurancesInfo
				})
			}
		});
	});
}

function createAutoInsurance(req, res, next) {
	const userid = xss(req.session.userid);
	const autoname = xss(req.body.autoname);
	const policyname = xss(req.body.policyname);
	const startdate = xss(req.body.startdate);
	const enddate = xss(req.body.enddate);
	const monthDifference = common.getMonthDifference(startdate, enddate);
	console.log(req.body.autoname);
	console.log(req.body.policyname);
	console.log(monthDifference);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var customerSql = 'select * from customer where customer.userid = ? and customer.type = "A"';
		connection.query(customerSql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				var sql = 'insert into customer (type, userid) values ("A", ?)';
				connection.query(sql, userid, function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					}
					console.log('--------------------------INSERT----------------------------')
					console.log('INSERT ID:', result)
					console.log('------------------------------------------------------------')
				});
			} else {
				var sql = 'select amount from policy where policy.policyname = ?'
				connection.query(sql, [policyname], function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else if (result.length == 0) {
						console.log('no such policy');
						res.send('no such policy');
						return;
					} else {
						var price = result[0].amount;
						sql = 'insert into auto_policy (userid, startdate, enddate, amount, autoname, policyname, paymentduedate, amountpaid) values (?, ?, ?, ?, ?, ?, ?, 0)';
						var sqlParam = [userid, startdate, enddate, price * monthDifference, autoname, policyname, enddate];
						console.log(sqlParam);
						connection.query(sql, sqlParam, function (err, result) {
							if (err) {
								console.log('[SELECT ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							}
							console.log('--------------------------INSERT----------------------------')
							console.log('INSERT ID:', result)
							console.log('------------------------------------------------------------')
							connection.end();
							res.redirect(301, '/dashboard');
						});
					}
				});
			}
		});
	});
}

function getAutoInsurancesInfo(req, res, next) {
	const userid = xss(req.session.userid);
	var AutoInsurancesInfo = {};
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select autoname from auto where auto.userid = ?';
		connection.query(sql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				console.log('no auto registered');
				res.send('no auto registered');
				return;
			} else {
				AutoInsurancesInfo.autoNames = result;
				sql = 'select policyname from policy where policy.type = "A"';
				connection.query(sql, [], function (err, policyResult) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else if (policyResult.length == 0) {
						console.log('no policy available');
						res.send('no policy available');
						return;
					} else {
						AutoInsurancesInfo.policyNames = policyResult;
						connection.end();
						res.render('user/auto/autoInsuranceSelect', {
							AutoInsurancesInfo: AutoInsurancesInfo
						})
					}
				});
			}
		});
	});
}

function getAutosInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.autoname, a.vin, a.modeldate, a.status from auto a inner join user d on a.userid = d.userid where d.userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			var autoInfo = result;
			common.correctAutoInfo(autoInfo);
			console.log(autoInfo);

			connection.end();
			res.render('user/auto/autoDisplay', {
				autoInfo: autoInfo
			});
		});
	});
}