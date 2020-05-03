const database = require('../config/databaseConfig');
exports.getUserInfo = getUserInfo;
exports.getHomeInfo = getHomeInfo;

function getHomeInfo(req, res, next) {
    const userid = req.session.userid;
    database.setUpDatabase(function(connection) {
        connection.connect();
        //var sql = 'select a.homeid, a.purchasedate, a.purchasevalue, a.area, a.type, a.autofirenotification, a.securitysystem, a.swimmingpool, a.basement from home a inner join hcustomer b on a.customerid = b.customerid inner join customer c on b.customerid = c.customerid inner join user d on c.userid = d.userid where d.userid = ?';
        var sql = 'select a.homeid from home a inner join hcustomer b on a.customerid = b.customerid where a.homeid = ?';
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
            homeInfo = result[0];
            console.log(homeInfo);
            
            res.render('homeDisplay', {
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
            console.log(userInfo);
            
            res.render('dashboard', {
                userInfo: userInfo
            });
        });
    });
}
