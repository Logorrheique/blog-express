//express
const express = require('express');
//router
const router = express.Router();
//db connection
const connectionDB = require('../db/config');

router.post('/', (req, res) => {
    const title = req.body.title;
    const postContent = req.body.postContent;
    const values = [title, postContent, 0];
    const sql = "INSERT INTO listpost(title,postContent,numberOfLike) VALUES(?)";
    connectionDB.query(sql, [values], function (err, data) {
        if (err) 
            throw err;
            //    console.log("User dat is inserted successfully ");
        }
    );
    res.redirect('/');
})

module.exports = router;