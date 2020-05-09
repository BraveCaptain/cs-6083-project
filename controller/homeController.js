const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.updateHome = updateHome;
exports.getHomesUpdateInfo = getHomesUpdateInfo;
exports.getHomesInfo = getHomesInfo;
exports.createHome = createHome;
exports.getHomeInsurancesInfo = getHomeInsurancesInfo;
exports.createHomeInsurance = createHomeInsurance;
exports.payHomeInsurance = payHomeInsurance;
exports.getUnpaidHomeInsurances = getUnpaidHomeInsurances;
exports.getHomeInvoiceInfo = getHomeInvoiceInfo;
exports.getHomePayInfo = getHomePayInfo;

function getHomesUpdateInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select homename, homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement from home where userid = ?'
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			homeInfo = result;
			console.log(homeInfo);
			res.render('user/home/homeUpdate', {
				homeInfo: homeInfo
			});
		});
	});
}

function updateHome(req, res, next) {
	console.log(req.body);
	const userid = xss(req.session.userid);
	const purchasedate = xss(req.body.purchasedate);
	const purchasevalue = xss(req.body.purchasevalue);
	const area = xss(req.body.area);
	const type = xss(req.body.type);
	const autofirenotification = xss(req.body.autofirenotification);
	const securitysystem = xss(req.body.securitysystem);
	const swimmingpool = xss(req.body.swimmingpool);
	const basement = xss(req.body.basement);
	const homename = xss(req.body.homename);
	const homeid = xss(req.body.homeid);
	database.setUpDatabase(function (connection) {
		console.log('here')
		connection.connect();
		var sql = 'select homename from home where homeid = ?';
		connection.query(sql, [homeid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			} else {
				var oldhomename = result[0].homename;
				console.log('oldhomename is: ', oldhomename);
				sql = 'select * from home where homename = ? and userid = ?';
				connection.query(sql, [homename, userid], function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send("SQL query error");
						return;
					}
					if (result.length > 0) {
						console.log('already exist homename: ', homename);
						res.send("already exist homename");
						return;
					}
					if (swimmingpool == 'NULL') {
						var addSqlParams = [homename, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, homeid];
						sql = 'update home set homename = ?, purchasedate = ?, purchasevalue = ?, area = ?, type = ?, autofirenotification = ?, securitysystem = ?, basement = ?, swimmingpool = NULL where homeid = ?';
					} else {
						var addSqlParams = [swimmingpool, homename, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, homeid];
						sql = 'update home set swimmingpool = ?, homename = ?, purchasedate = ?, purchasevalue = ?, area = ?, type = ?, autofirenotification = ?, securitysystem = ?, basement = ? where homeid = ?';
					}
					connection.query(sql, addSqlParams, function (err, result) {
						if (err) {
							console.log('[INSERT ERROR] - ', err.message)
							res.send("SQL update error");
							return;
						} else {
							sql = 'update home_policy set homename = ? where homename = ? and userid = ?';
							connection.query(sql, [homename, oldhomename, userid], function (err, result) {
								if (err) {
									console.log('[INSERT ERROR] - ', err.message)
									res.send("SQL update error");
									return;
								} else {
									console.log('--------------------------INSERT----------------------------')
									console.log('INSERT ID:', result)
									console.log('------------------------------------------------------------')
									//issue 01: 注册成功alert
									connection.end();
									res.redirect(301, '/dashboard');
								}
							});
						}
					});
				});
			}
		});
	});
}

function getUnpaidHomeInsurances(req, res, next) {
	const userid = xss(req.session.userid);
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
				res.render('user/home/homeInsurancePay', {
					unpaidHomeInsurancesInfo: unpaidHomeInsurancesInfo
				})
			}
		});
	});
}

function payHomeInsurance(req, res, next) {
	const userid = xss(req.session.userid);
	const method = xss(req.body.method);
	const hpid = xss(req.body.hpid);
	const paymentAmount = xss(req.body.amount);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var amountsql = 'select (amount-amountpaid)leftamount from home_policy where home_policy.hpid = ?';
		connection.query(amountsql, [hpid], function (err, result) {
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
			} else {
				var sql = 'insert into hpayment (userid, paymentdate, method, hpid, amount) values (?, NOW(), ?, ?, ?)';
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
			}
		});
	});
}

function createHomeInsurance(req, res, next) {
	const userid = xss(req.session.userid);
	const homename = xss(req.body.homename);
	const policyname = xss(req.body.policyname);
	const startdate = xss(req.body.startdate);
	const enddate = xss(req.body.enddate);
	const monthDifference = common.getMonthDifference(startdate, enddate);
	console.log(req.body.homename);
	console.log(req.body.policyname);
	console.log(monthDifference);
	database.setUpDatabase(function (connection) {
		connection.connect();
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
	});
}

function getHomeInsurancesInfo(req, res, next) {
	const userid = xss(req.session.userid);
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
						res.render('user/home/homeInsuranceSelect', {
							homeInsurancesInfo: homeInsurancesInfo
						})
					}
				});
			}
		});
	});
}

function getHomesInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select homename, homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement from home where userid = ?'
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			homeInfo = result;
			console.log(homeInfo);
			//common.correctHomeInfo(homeInfo);
			res.render('user/home/homeDisplay', {
				homeInfo: homeInfo
			});
		});
	});
}

function createHome(req, res, next) {
	console.log('enter function createHome');
	console.log(req.body);
	const userid = xss(req.session.userid);
	const purchasedate = xss(req.body.purchasedate);
	const purchasevalue = xss(req.body.purchasevalue);
	const area = xss(req.body.area);
	const type = xss(req.body.type);
	const autofirenotification = xss(req.body.autofirenotification);
	const securitysystem = xss(req.body.securitysystem);
	const swimmingpool = xss(req.body.swimmingpool);
	const basement = xss(req.body.basement);
	const homename = xss(req.body.homename);
	//verify

	database.setUpDatabase(function (connection) {
		connection.connect();
		//issue: home name
		var sql = 'select * from home where homename = ? and userid = ?';
		connection.query(sql, [homename, userid], function (err, result) {
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

function getHomeInvoiceInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hpid, paymentduedate, amount, (amount-amountpaid)leftamount, enddate, homename, policyname from home_policy where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			homeInvoiceInfo = result;
			console.log(homeInvoiceInfo);

			res.render('user/home/homeInvoiceDisplay', {
				homeInvoiceInfo: homeInvoiceInfo
			});
		});
	});
}

function getHomePayInfo(req, res, next) {
	const userid = xss(req.session.userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select paymentid, paymentdate, method, hpid, amount from hpayment where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			homePayInfo = result;
			console.log(homePayInfo);

			res.render('user/home/homePayDisplay', {
				homePayInfo: homePayInfo
			});
		});
	});
}