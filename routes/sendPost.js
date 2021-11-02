//express
const express = require('express');
//router
const router = express.Router();

//mysql
const mysql = require('mysql');

//config database
const config = require('../db/configConnect');

//check auth
const { checkAuthenticated } = require("../googleAuth/checkAuthenticated");

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

router.post('/',checkAuthenticated,(req, res) => {
    const values = [0,req.user.id,req.user.name,req.user.picture,req.body.title,req.body.postContent];
    const query = 'INSERT INTO post VALUES(?)';
    connectionDB.connect((err) => {
        connectionDB.query(query,[values],(err,result) => {
            if (err) throw err;
        }) 
    })
    res.redirect('/');
})

module.exports = router;