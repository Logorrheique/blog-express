//mysql
const mysql = require('mysql');

//database config
const configConnect = {
    db: {/* don't expose password or any sensitive info, done only for demo */
        host: 'localhost',
        user: 'root',
        password: 'RA71K2CWFH/3B,',
        database: 'logopost'
    }
};

module.exports = configConnect;
