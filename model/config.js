var mysql = require('mysql')

exports.setUpDatebase = setUpDatabase

const env = 'dev'

const hostName = 'localhost'
const user = 'root'
const password = 'Tqy!520ganre'
const port = '3306'
const databaseName = 'WDS'

function setUpDatabase(callback) {
    var connection = mysql.createConnection({
        host: hostName,
        user: user,
        password: password,
        port: port,
        database: databaseName
    })
    callback(connection)
}
