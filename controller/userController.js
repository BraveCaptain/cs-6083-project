const database = require('../config/databaseConfig')

exports.createUser = createUser;
exports.loginUser = loginUser;

function createUser(req, res, next) {
    //res.send(req.body);
    const id = req.body.userid;
    const password = req.body.password;
    //verify
    if(id.trim().length == 0) {
        return res.status(400).send('<h4>user id error</h4>');
    }
    if(password.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }

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
            var addSql = 'insert into user (userid, password) values (?, ?)';
            var addSqlParams = [id, password];
            connection.query(addSql, addSqlParams, function(err, result){
                if(err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                //issue 01: 注册成功alert
                res.redirect(301, '/login');
                //connection.end();
            })
        }) 
    })
}

function loginUser(req, res, next) {
    const id = req.body.userid;
    const password = req.body.password;
    //verify
    if(id.trim().length == 0) {
        return res.status(400).send('<h4>user id error</h4>');
    }
    if(password.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select password from user where userid = ?';
        connection.query(sql, [id], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                //issue03: 缺少error前端框架渲染
                res.send("SQL query error");
                return;
            }
            if(result.length == 0) {
                console.log('no such user, please register');
                res.send("no such user");
                return;
            }
            if(result[0].password != password) {
                console.log('password error');
                res.send("password error");
                return;
            }
            res.redirect(301, '/dashBoard');
        })
    })
}