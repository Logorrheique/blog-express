//express
const express = require('express');
//router
const router = express.Router();
//cookie parser
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', (req,res)=> {
    res.clearCookie('session-token');
    res.redirect('/');
})

module.exports = router;