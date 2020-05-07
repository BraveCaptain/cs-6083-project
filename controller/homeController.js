const database = require('../config/databaseConfig');
const common = require('./util/common');

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
	const userid = req.session.userid;
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
    const homeid = req.body.homeid;
	//verify
	database.setUpDatabase(function (connection) {
        console.log('here')
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
				res.render('user/home/homeInsurancePay', {
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

			res.render('user/home/homeDisplay', {
				homeInfo: homeInfo
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

function getHomeInvoiceInfo(req, res, next) { 
    const userid = req.session.userid;
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hpid, paymentduedate, amount, (amount-amountpaid)leftamount from home_policy where userid = ?';
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
    const userid = req.session.userid;
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