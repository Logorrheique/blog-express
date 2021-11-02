//express
const { query } = require('express');
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

router.get('/',checkAuthenticated,(req,res) => {
    const query = 'select * from post order by post_id limit 10';
    connectionDB.connect((err) => {
        connectionDB.query(query,(err,result) => {
            if (err) throw err;
            const post = {...result};
            res.render("main", { layout: "feed", postList : post});
        }) 
    })
})
module.exports = router;