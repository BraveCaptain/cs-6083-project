var mysql = require('mysql')
const database = require('./database')

exports.setUpDatabase = setUpDatabase

function setUpDatabase(callback) {
    var connection = mysql.createConnection({
        host: database.hostName,
        user: database.user,
        password: database.password,
        port: database.port,
        database: database.databaseName
    })
    callback(connection)
}
