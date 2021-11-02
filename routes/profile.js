//express
const express = require('express');
//router
const router = express.Router()
//checkAuthentication
const { checkAuthenticated } = require("../googleAuth/checkAuthenticated");

//profile insert
router.get('/', checkAuthenticated, (req,res) =>  {     
    let user = req.user;
    console.log(user);
    res.render('main', {
        layout: 'profile',
        userInfos: user
    })
 });

 module.exports = router;