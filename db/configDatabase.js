//mysql
const mysql = require('mysql');

//config database
const config = require('./configConnect');

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

//database function
function database() {
    const database = 'CREATE DATABASE IF NOT EXISTS logopost';
    connectionDB.query(database, (err, result) => {
        if (err) 
            throw err;
        }
    );
}

//definition of tables
const tables = [
    'CREATE TABLE IF NOT EXISTS user (user_id VARCHAR (21) PRIMARY KEY,user_email VARCHAR (255) ,user_name VARCHAR (25) NOT NULL,user_picture VARCHAR (255) NOT NULL)',
    'CREATE TABLE IF NOT EXISTS post (post_id INT PRIMARY KEY AUTO_INCREMENT,user_id VARCHAR (21),user_name VARCHAR (25),user_picture VARCHAR (255), post_title VARCHAR(255), post_content VARCHAR (3000))',
];

//creation of tables
function createTable() {
    connectionDB.connect(function (err) {
        tables.forEach(element => {
            connectionDB.query(element, (err, result) => {
                if (err) throw err;
            })
        });
    })
};
//function to create the entirely database 
function createDatabase() {
    // database(); uncomment if need 
    createTable();
}
module.exports = createDatabase,connectionDB;




