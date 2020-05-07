const database = require('../config/databaseConfig');
const common = require('./util/common');

exports.updateDriver = updateDriver;
exports.getDriversUpdateInfo = getDriversUpdateInfo;
exports.getDriverInfo = getDriverInfo;
exports.createDriver = createDriver;
exports.getAutosInfoForDriver = getAutosInfoForDriver;

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
			res.render('user/driver/driverRegister', {
				autoInfoForDriver: autoInfoForDriver
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
                console.log("yyyyyy");
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            } else if (result.length == 0) {
                console.log('no auto');
                res.send('no auto');
                return;
            }
            else {
                console.log("aaaaaa");
                const autoname = result[0].autoname;
                console.log(autoname);
                var sql = 'select * from driver where driver.licensenum = ?';
                connection.query(sql, [licensenum], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    else {

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

			res.render('user/driver/driverDisplay', {
				driverInfo: driverInfo
			});
		});
	});
}

function getDriversUpdateInfo(req, res, next) {
    const userid = req.session.userid;
    var driverInfo = {};
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select distinct licensenum from driver where userid = ?'
        connection.query(sql, [userid], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            } else {
                driverInfo = result;
                res.render('user/driver/driverUpdate', {
                    driverInfo: driverInfo
                });
            }
            
        });
    });
}

function updateDriver(req, res, next) {
    const userid = req.session.userid;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const birthdate = req.body.birthdate;
    const licensenum = req.body.licensenum;
    //verify
    database.setUpDatabase(function (connection) {
        console.log('here')
        connection.connect();
        //issue: driver name
        var sql = 'update driver set fname = ?, lname = ?, birthdate = ? where licensenum = ?';
        connection.query(sql, [fname, lname, birthdate, licensenum], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
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
}