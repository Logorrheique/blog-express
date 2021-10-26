//mysql
const mysql = require('mysql');

//config database
const config = require('./configConnect');

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

const addUser = ( user ) => {
    console.log(user);
    const values = [0,user.email, user.name, user.picture]
    const sql = 'INSERT IGNORE INTO user VALUES(?)'
    connectionDB.connect((err) => {
        connectionDB.query(sql,[values],(err,result) => {
            console.log(result.affectedRows);
        }) 
    })
}

module.exports = addUser;

