//mysql
const mysql = require('mysql');

//config database
const config = require('./configConnect');

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

const addUser = ( user ) => {
    const values = [user.id,user.email, user.name, user.picture]
    const sql = 'INSERT IGNORE INTO user VALUES(?)'
    connectionDB.connect((err) => {
        connectionDB.query(sql,[values],(err,result) => {
            if(result.affectedRows == 0) console.log('Already in your DB');
        }) 
    })
}

module.exports = addUser;

