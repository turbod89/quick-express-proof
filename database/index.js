const mysql = require('mysql');
const connection_settings = require('../config/database');



Database = (function (settings) {

    const connections = {};

    const Database = function (conn_name) {

        const db = this;

        if (conn_name in connections) {
            return connections[conn_name];
        }

        if ( !(conn_name in settings) ) {
            return null;
        }

        // set connection
        const set = settings[conn_name];
        db.connection =  mysql.createConnection({
            host: set.host,
            user: set.username,
            password: set.password,
            port: set.port,
        });

        // connect
        db.connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + db.connection.threadId);
        });

    };

    return Database;

})(connection_settings);



module.exports = Database;