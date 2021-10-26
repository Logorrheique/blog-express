//mysql
const mysql = require('mysql');

//config database
const config = require('./configConnect');

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

//database function
async function database() {
    const database = 'CREATE DATABASE IF NOT EXISTS logopost';
    connectionDB.query(database, (err, result) => {
        if (err) 
            throw err;
        }
    );
}

//definition of tables
const tables = [
    userTable = 'CREATE TABLE IF NOT EXISTS user (user_id INT PRIMARY KEY AUTO_INCREMENT,user_email VARCHAR (255) ,user_name VARCHAR (25) NOT NULL,user_picture VARCHAR (255) NOT NULL)',
    postTable = 'CREATE TABLE IF NOT EXISTS post (post_id INT PRIMARY KEY AUTO_INCREMENT, post_title VARCHAR(255), post_content VARCHAR (3000))',
    postListTable = 'CREATE TABLE IF NOT EXISTS post_list (user_id INT, post INT, FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (post) REFERENCES post(post_id))',
];
async function createTable() {
    connectionDB.connect(function (err) {
        tables.forEach(element => {
            connectionDB.query(element, (err, result) => {
                if (err) 
                    throw err;
                console.log(`table ok`);
            })
        });
    })
};

async function createDatabase() {
    await database().then(createTable());
}
module.exports = createDatabase,connectionDB;


//SOULD FIX PRIMARY AND AUTO INCREMENT WITH IGNORE CONTRAINT



