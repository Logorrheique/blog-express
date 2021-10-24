//express
const express = require('express');
//router
const router = express.Router();
//get google token 
const getGGToken = require('../googleAuth/google-token');

router.post('/', (req, res) => {
  getGGToken(req, res);
});

module.exports = router;