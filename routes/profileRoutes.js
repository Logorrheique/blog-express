//express
const express = require('express');
//router
const router = express.Router()
//checkAuthentication
const { checkAuthenticated } = require("../googleAuth/checkAuthenticated");

//profile insert
const addUser  = require('../db/addProfile');

router.get('/', checkAuthenticated, (req,res) =>  {     
    let user = req.user;
    addUser(user);
    res.render('main', {
        layout: 'profile',
        userInfos: user
    })
 });

 module.exports = router;