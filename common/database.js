const mysql = require('mysql');

function connect(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'siddhant',
        password : 'asdqwe99',
        database : 'royalGym'
    });
    console.log("DONE WITH DB CONNECTION");
    connection.connect();
    return connection;
}

module.exports = {
    connect : connect
};