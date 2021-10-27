//express
const express = require('express');
//router
const router = express.Router();
//get google token 
const getGGToken = require('../googleAuth/google-token');

router.post('/', (req, res) => {
  getGGToken();
  
});
router.get('/',(req,res) => {
  res.render("main", { layout: "login" });
})
module.exports = router;