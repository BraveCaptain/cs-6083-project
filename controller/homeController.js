const database = require('../config/databaseConfig');
exports.getHomeInfo = getHomeInfo;

function getHomeInfo(req, res, next) {
    const userid = req.session.userid;
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select a.homeID, a.purchaseDate, a.purchaseValue, a.area, a.type, a.autoFireNotification, a.securitySystem, a.swimmingPool, a.basement from HOME a inner join HCUSTOMER b on a.customerID = b.customerID inner join CUSTOMER c on b.customerID = c.customerID inner join USER d on c.userID = d.userID where d.userID = ?';
        connection.query(sql, [userid], function(err, result) {
            if(err) {
                consolse.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            }
            if(result.length == 0) {
                console.log('no such user');
                res.send('no such user');
                return;
            }
            homeInfo = JSON.parse(JSON.stringify(result[0]));
            console.log(homeInfo);
            
            res.render('home', {
                homeInfo: homeInfo
            });
        });
    });
}
