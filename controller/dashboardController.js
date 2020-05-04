const database = require('../config/databaseConfig');
const common = require('./util/common');

exports.getUserInfo = getUserInfo;
exports.getHomeInfo = getHomeInfo;
exports.createHome = createHome;
exports.createAuto = createAuto;

function getHomeInfo(req, res, next) {
    const userid = req.session.userid;
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select a.homeid, a.purchasedate, a.purchasevalue, a.area, a.type, a.autofirenotification, a.securitysystem, a.swimmingpool, a.basement from home a inner join hcustomer b on a.customerid = b.customerid inner join customer c on b.customerid = c.customerid inner join user d on c.userid = d.userid where d.userid = ?';
        //var sql = 'select a.homeid from home a inner join hcustomer b on a.customerid = b.customerid where a.homeid = ?';
        connection.query(sql, [userid], function(err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            }
            homeInfo = result[0];
            console.log(homeInfo);
            
            res.render('user/homeDisplay', {
                homeInfo: homeInfo
            });
        });
    });
}

function getUserInfo(req, res, next) {
    const userid = req.session.userid;
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select userid, fname, lname, state, city, street, zipcode, gender, maritalstatus from user where userid = ?';
        connection.query(sql, [userid], function(err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            }
            if(result.length == 0) {
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
    //verify

    database.setUpDatabase(function(connection) {
        connection.connect();
        //issue: home name
        var sql = 'select * from home';
        connection.query(sql, [], function(err, result) {
            // if (err) {
            //     console.log('[SELECT ERROR] - ', err.message);
            //     res.send("SQL query error");
            //     return;
            // }
            // if(result.length > 0) {
            //     console.log('Already exists user id', id);
            //     res.send("User already exists");
            //     return;
            // }

            if(swimmingpool == 'NULL') {
                var addSqlParams = [userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement];
                console.log(addSqlParams);
                var addSql = 'insert into home (userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement) values (?, ?, ?, ?, ?, ?, ?, ?)';
            }
            else{
                var addSqlParams = [userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, swimmingpool];
                console.log(addSqlParams);
                var addSql = 'insert into home (userid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, basement, swimmingpool) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            }
            connection.query(addSql, addSqlParams, function(err, result) {
                if(err) {
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
    //verify
    database.setUpDatabase(function(connection) {
        connection.connect();
        //issue: home name
        var sql = 'select * from auto';
        connection.query(sql, [], function(err, result) {
            // if (err) {
            //     console.log('[SELECT ERROR] - ', err.message);
            //     res.send("SQL query error");
            //     return;
            // }
            // if(result.length > 0) {
            //     console.log('Already exists user id', id);
            //     res.send("User already exists");
            //     return;
            // }
            var addSqlParams = [userid, modeldate, status];
            console.log(addSqlParams);
            var addSql = 'insert into auto (userid, modeldate, status) values (?, ?, ?)';
            connection.query(addSql, addSqlParams, function(err, result) {
                if(err) {
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