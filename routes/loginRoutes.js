//express
const express = require('express');
//router
const router = express.Router();

const getGGToken = require('../googleAuth/google-token');


router.post('/', (req, res) => {
  getGGToken(req, res);
});

module.exports = router;