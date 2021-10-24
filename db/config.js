//mysql
const mysql = require('mysql');

//database config
const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host    : 'localhost',
    user    : 'root',
    password: 'RA71K2CWFH/3B,',
  },
};
console.log(`Succesfully connected to`,config.db.database,`database`)

//create connection with DB
const connectionDB = mysql.createConnection(config.db);

module.exports = config; 
