//express
const express = require('express');
//router
const router = express.Router();

//mysql
const mysql = require('mysql');

//config database
const config = require('../db/configConnect');

//create connnection with database
const connectionDB = mysql.createConnection(config.db);

router.post('/',(req, res) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;