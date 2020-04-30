const database = require('../config/databaseConfig')

function createCustomer(req, res, next) {
    const id = req.body.username;
    const password = req.body.password;

    database.setUpDatebase(function(connection) {
        connection.connect();
        var sql = 'select * from customer where customerid = ?';
        connection.query(sql, [id], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if(result.length > 0) {
                console.log('Already exists customer id', id);
                res.send("User already exists");
                return;
            }
        }) 

    })
}