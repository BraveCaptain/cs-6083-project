const database = require('../config/databaseConfig');
const common = require('./util/common');

exports.getUserInfo = getUserInfo;
exports.getHomesInfo = getHomesInfo;
exports.getAutosInfo = getAutosInfo;
exports.getAutoDrivers = getAutoDrivers;
exports.createHome = createHome;
exports.createAuto = createAuto;
exports.getHomeInsurancesInfo = getHomeInsurancesInfo;
exports.createHomeInsurance = createHomeInsurance;
exports.payHomeInsurance = payHomeInsurance;
exports.getUnpaidHomeInsurances = getUnpaidHomeInsurances;
exports.getAutoDrivers = getAutoDrivers;
exports.getAutoInsurancesInfo = getAutoInsurancesInfo;
exports.createAutoInsurance = createAutoInsurance;
exports.getUnpaidAutoInsurances = getUnpaidAutoInsurances;
exports.payAutoInsurance = payAutoInsurance;

function payAutoInsurance(req, res, next) {
	const userid = req.session.userid;
	const method = req.body.method;
	const apid = req.body.apid;
	const paymentAmount = req.body.amount;
	const leftamount = req.body.leftamount;
	if(paymentAmount > leftamount) {
		console.log('pay too much');
		res.send('payment amount is greater than remaining amount');
		return;
	}
	database.setUpDatabase(function (connection) {
		connection.connect();
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
	});
}

function getUnpaidAutoInsurances(req, res, next) {
	const userid = req.session.userid;
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
				res.render('user/autoInsurancePay', {
					unpaidAutoInsurancesInfo: unpaidAutoInsurancesInfo
				})
			}
		});
	});
}

function createAutoInsurance(req, res, next) {
	const userid = req.session.userid;
	const autoname = req.body.autoname;
	const policyname = req.body.policyname;
	const startdate = req.body.startdate;
	const enddate = req.body.enddate;
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
	const userid = req.session.userid;
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
						res.render('user/autoInsuranceSelect', {
							AutoInsurancesInfo: AutoInsurancesInfo
						})
					}
				});
			}
		});
	});
}

function getAutoDrivers(req, res, next) {
	const userid = req.session.userid;
	const autoname = req.session.autoname;
	database.setUpDatabase(function (connection) {
		connection.conect();
		var sql = 'select licensenum from driver_auto where driver_auto.userid = ? and driver_auto.autoname = ?';
		connection.query(sql, [userid, autoname], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				console.log('no driver registered');
				res.send('no driver registered');
				return;
			} else {
				connection.end();
				//
			}
		});
	});
}

function getUnpaidHomeInsurances(req, res, next) {
	const userid = req.session.userid;
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hpid, (amount-amountpaid)leftamount, amountpaid, paymentduedate, homename, policyname from home_policy where home_policy.userid = ? and home_policy.amountpaid < home_policy.amount';
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
				var unpaidHomeInsurancesInfo = result;
				connection.end();
				res.render('user/homeInsurancePay', {
					unpaidHomeInsurancesInfo: unpaidHomeInsurancesInfo
				})
			}
		});
	});
}

function payHomeInsurance(req, res, next) {
	const userid = req.session.userid;
	const method = req.body.method;
	const hpid = req.body.hpid;
	const paymentAmount = req.body.amount;
	const leftamount = req.body.leftamount;
	if(paymentAmount > leftamount) {
		console.log('pay too much');
		res.send('payment amount is greater than remaining amount');
		return;
	}
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'insert into a (userid, paymentdate, method, hpid, amount) values (?, NOW(), ?, ?, ?)';
		connection.query(sql, [userid, method, hpid, paymentAmount], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else {
				console.log('--------------------------INSERT----------------------------')
				console.log('INSERT ID:', result)
				console.log('------------------------------------------------------------')
				sql = 'update home_policy set amountpaid = amountpaid + ? where hpid = ?';
				connection.query(sql, [paymentAmount, hpid], function (err, result) {
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
	});
}

function createHomeInsurance(req, res, next) {
	const userid = req.session.userid;
	const homename = req.body.homename;
	const policyname = req.body.policyname;
	const startdate = req.body.startdate;
	const enddate = req.body.enddate;
	const monthDifference = common.getMonthDifference(startdate, enddate);
	console.log(req.body.homename);
	console.log(req.body.policyname);
	console.log(monthDifference);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var customerSql = 'select * from customer where customer.userid = ? and customer.type = "H"';
		connection.query(customerSql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				var sql = 'insert into customer (type, userid) values ("H", ?)';
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
						sql = 'insert into home_policy (userid, startdate, enddate, amount, homename, policyname, paymentduedate, amountpaid) values (?, ?, ?, ?, ?, ?, ?, 0)';
						var sqlParam = [userid, startdate, enddate, price * monthDifference, homename, policyname, enddate];
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

function getHomeInsurancesInfo(req, res, next) {
	const userid = req.session.userid;
	var homeInsurancesInfo = {};
	database.setUpDatabase(function (connection) {
		connection.connect();
		var homeSql = 'select homename from home where home.userid = ?';
		connection.query(homeSql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				console.log('no home registered');
				res.send('no home registered');
				return;
			} else {
				homeInsurancesInfo.homeNames = result;
				var policySql = 'select policyname from policy where policy.type = "H"';
				connection.query(policySql, [], function (err, policyResult) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else if (policyResult.length == 0) {
						console.log('no policy available');
						res.send('no policy available');
						return;
					} else {
						homeInsurancesInfo.policyNames = policyResult;
						connection.end();
						res.render('user/homeInsuranceSelect', {
							homeInsurancesInfo: homeInsurancesInfo
						})
					}
				});
			}
		});
	});
}

function getAutosInfo(req, res, next) {
	const userid = req.session.userid;
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
			console.log(autoInfo);
			connection.end();
			res.render('user/autoDisplay', {
				autoInfo: autoInfo
			});
		});
	});
}

function getHomesInfo(req, res, next) {
	const userid = req.session.userid;
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.homename, a.homeid, a.purchasedate, a.purchasevalue, a.area, a.type, a.autofirenotification, a.securitysystem, a.swimmingpool, a.basement from home a  inner join user d on a.userid = d.userid where d.userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			homeInfo = result;
			console.log(homeInfo);

			res.render('user/homeDisplay', {
				homeInfo: homeInfo
			});
		});
	});
}

function getUserInfo(req, res, next) {
	const userid = req.session.userid;
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
				res.send('no such user');
				return;
			}
			userInfo = result[0];
			common.correctUserInfo(userInfo);
			//console.log(userInfo);
			res.render('user/dashboard', {
				userInfo: userInfo
			});
		});
	});
}

function createHome(req, res, next) {
	console.log('enter function createHome');
	console.log(req.body);
	const userid = req.session.userid;
	const purchasedate = req.body.purchasedate;
	const purchasevalue = req.body.purchasevalue;
	const area = req.body.area;
	const type = req.body.type;
	const autofirenotification = req.body.autofirenotification;
	const securitysystem = req.body.securitysystem;
	const swimmingpool = req.body.swimmingpool;
	const basement = req.body.basement;
	const homename = req.body.homename;
	//verify

	database.setUpDatabase(function (connection) {
		connection.connect();
		//issue: home name
		var sql = 'select * from home where home.homename = ?';
		connection.query(sql, homename, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			if (result.length > 0) {
				console.log('Already exists home name: ', homename);
				res.send("home name already exists");
				return;
			}

			if (swimmingpool == 'NULL') {
				var addSqlParams = [homename, userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement];
				console.log(addSqlParams);
				var addSql = 'insert into home (homename, userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
			} else {
				var addSqlParams = [homename, userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, swimmingpool];
				console.log(addSqlParams);
				var addSql = 'insert into home (homename, userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, swimmingpool) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
			}
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

function createAuto(req, res, next) {
	console.log('enter function createAuto');
	console.log(req.body);
	const userid = req.session.userid;
	const modeldate = req.body.modeldate;
	const status = req.body.status;
	const autoname = req.body.autoname;
	const vin = req.body.vin;
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