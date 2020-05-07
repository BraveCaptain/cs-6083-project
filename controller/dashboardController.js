const database = require('../config/databaseConfig');
const common = require('./util/common');

exports.getUserInfo = getUserInfo;

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
<<<<<<< HEAD

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

function getDriverInfo(req, res, next) { 
    const userid = req.session.userid;
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select licensenum, fname, lname, vin, autoname, birthdate from driver where userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
			driverInfo = result;
			console.log(driverInfo);

			res.render('user/driverDisplay', {
				driverInfo: driverInfo
			});
		});
	});
}

function createDriver(req, res, next) {
	console.log('enter function createDriver');
	console.log(req.body);
	const userid = req.session.userid;
	const licensenum = req.body.licensenum;
	const fname = req.body.fname;
	const lname = req.body.lname;
    const vin = req.body.vin;
    const birthdate = req.body.birthdate;
	console.log(Date.parse(birthdate));
	//verify
	database.setUpDatabase(function (connection) {
		connection.connect();
        //issue: home name
        var findsql = 'select autoname from auto where auto.vin = ?';
        connection.query(findsql, [vin], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            } else if (result.length == 0) {
                console.log('no auto');
                res.send('no auto');
                return;
            }
            else {
                const autoname = result[0].autoname;
                console.log(autoname);
                var sql = 'select * from driver where driver.licensenum = ?';
                connection.query(sql, [licensenum], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    else if (result.length > 0) {
                        console.log('Already exists same auto licensenum: ', licensenum);
                        res.send('Already exists same auto licensenum');
                        return;
                    } else {

                        var addSqlParams = [licensenum, vin, userid, birthdate, fname, lname, autoname];
                        console.log(addSqlParams);
			            var addSql = 'insert into driver (licensenum, vin, userid, birthdate, fname, lname, autoname) values (?, ?, ?, ?, ?, ?, ?)';
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
                    }
                })
            }
			
		})
	})
}

function getAutosInfoForDriver(req, res, next) {
	const userid = req.session.userid;
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.autoname, a.vin from auto a inner join user d on a.userid = d.userid where d.userid = ?';
		connection.query(sql, [userid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			var autoInfoForDriver = result;
			console.log(autoInfoForDriver);
			connection.end();
			res.render('user/driverRegister', {
				autoInfoForDriver: autoInfoForDriver
			});
		});
	});
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

			res.render('user/homeInvoiceDisplay', {
				homeInvoiceInfo: homeInvoiceInfo
			});
		});
	});
}

function getAutoInvoiceInfo(req, res, next) { 
    const userid = req.session.userid;
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

			res.render('user/autoInvoiceDisplay', {
				autoInvoiceInfo: autoInvoiceInfo
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

			res.render('user/homePayDisplay', {
				homePayInfo: homePayInfo
			});
		});
	});
}

function getAutoPayInfo(req, res, next) { 
    const userid = req.session.userid;
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

			res.render('user/autoPayDisplay', {
				autoPayInfo: autoPayInfo
			});
		});
	});
}
=======
>>>>>>> master
