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

router.get('/id:*',checkAuthenticated,(req, res) => {
    const idToModify = req.params['0'];
    const user = req.user.id;
    const query = 'SELECT * from post WHERE user_id = '+ user +' AND post_id = '+idToModify;
    console.log(query);
    connectionDB.connect((err) => {
        connectionDB.query(query,(err,result) => {
            if (err) throw err;
            const post = {...result};
            res.render("main", { layout: "modifyPost", postList : post});
        })
    })
})

module.exports = router;