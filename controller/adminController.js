const database = require('../config/databaseConfig');
const bcrypt = require('bcrypt');
const saltRound = 10;
const xss = require('xss');

exports.createAdmin = createAdmin;
exports.loginAdmin = loginAdmin;
exports.getAdmins = getAdmins;
exports.logoutAdmin = logoutAdmin;
function createAdmin(req, res, next) {
    console.log('enter function createAdmin');
    const id = xss(req.body.userid);
    const plainTextPassword = xss(req.body.password1);
    const plainTextPasswordAgain = xss(req.body.password2);
    //verify
    if(id.trim().length == 0) {
        return res.status(400).send('<h4>admin id error</h4>');
    }
    if(plainTextPassword.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select * from admin where adminid = ?';
        connection.query(sql, [id], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if(result.length > 0) {
                console.log('Already exists admin id', id);
                res.send("Admin already exists");
                return;
            }
            var password = bcrypt.hashSync(plainTextPassword, saltRound);
            console.log(password);
            var addSql = 'insert into admin (adminid, password) values (?, ?)';
            var addSqlParams = [id, password];
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
                res.redirect(301, '/admin/login');
            })
        }) 
    })
}

function loginAdmin(req, res, next) {
    const id = xss(req.body.userid);
    const plainTextPassword = xss(req.body.password);
    //verify
    if(id.trim().length == 0) {
        return res.status(400).send('<h4>admin id error</h4>');
    }
    if(plainTextPassword.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select password from admin where adminid = ?';
        connection.query(sql, [id], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                //issue03: 缺少error前端框架渲染
                res.send("SQL query error");
                return;
            }
            if(result.length == 0) {
                console.log('no such admin, please register');
                res.send("no such admin");
                return;
            }
            const admin = result[0]
            bcrypt.compare(plainTextPassword, admin.password, function (err, success) {
                if(err) {
                    console.log('BCRYPT COMPARE ERROR');
                    res.send('BCRYPT COMPARE ERROR');
                    return;
                }
                if(!success) {
                    console.log('password error');
                    res.send('password error');
                    return;
                }
                connection.end();
                //issue03: 缺少error前端框架渲染
                req.session.adminid = id;
                req.app.locals.adminid = id;
                res.redirect(301, '/admin/dashboard');
            });
        })
    })
}

function getAdmins(req, res, next) {
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select adminid from admin';
        connection.query(sql, [], function(err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            }
            console.log(result);
            if(result.length == 0) {
                console.log('no admin currently');
                res.send('no such admin currently');
                return;
            }
            res.render('admin/dashboard', {
                users: result
            });
        });
    });
}

function logoutAdmin(req, res, next) {
    req.session.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('/admin/login');
    });
}