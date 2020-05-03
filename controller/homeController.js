const database = require('../config/databaseConfig');


exports.createHome = createHome;
exports.getHomeInfo = getHomeInfo;

function createHome(req, res, next) {
    console.log('enter function createUser');
    const homeid = req.body.homeid;
    const date = req.body.purchaseDate;
    const value = req.body.purchaseValue;
    const area = req.body.area;
    const type = req.body.type;
    const fire = req.body.autoFireNotification;
    const security = req.body.securitySystem;
    const swimmingpool = req.body.swimmingpool;
    const basement = req.body.basement;
    const customerid = req.body.customerid;
    //verify

    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select * from user where userid = ?';
        connection.query(sql, [id], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if(result.length > 0) {
                console.log('Already exists user id', id);
                res.send("User already exists");
                return;
            }
            var password = bcrypt.hashSync(plainTextPassword, saltRound);
            if(swimmingpool == 'NULL') {
                var addSqlParams = [id, password, fname, lname, state, city, street, zipcode, maritalstatus];
                console.log(addSqlParams);
                var addSql = 'insert into user (userid, password, fname, lname, state, city, street, zipcode,  maritalstatus) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            }
            else{
                var addSqlParams = [id, password, fname, lname, state, city, street, zipcode, gender, maritalstatus];
                console.log(addSqlParams);
                var addSql = 'insert into user (userid, password, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            }
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
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
                res.redirect(301, '/login');
            })
        }) 
    })
}

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
