//express
const express = require('express');
//router
const router = express.Router()
//checkAuthentication
const { checkAuthenticated } = require("../googleAuth/checkAuthenticated");

router.get('/',checkAuthenticated, (req, res) => {
    res.render('main', {layout: 'creation-post'});
})

module.exports = router;