const mysql = require('mysql');
const connection_settings = require('../config/database');



const Database = (function (settings) {

    /*
    * Each connection is a singleton
    * */
    const connectionInstances = {};

    /*
    * Class itself
    * */
    const Database = function (conn_name) {

        /*
        * If exists return instance
        * */
        if (conn_name in connectionInstances) {
            return connectionInstances[conn_name];
        }

        /*
        * If this connection does not exists return null
        * */
        if ( !(conn_name in settings) ) {
            return null;
        }

        /*
        * Set singleton instance
        * */
        const db = this;
        connectionInstances[conn_name] = db;

        /*
        * Configuring connection settings
        * */
        const set = settings[conn_name];
        db.connection =  mysql.createConnection({
            host: set.host,
            user: set.username,
            password: set.password,
            port: set.port,
        });

        /*
        * Set connection to db
        * */
        db.connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + db.connection.threadId);
        });

        /*
        * Return singleton instance
        * */
        return db;

    };

    /*
    * Return class
    * */
    return Database;

})(connection_settings);



module.exports = Database;