'use strict';
const express = require('express');
const router = express.Router();


/* GET home page. */
router.post('/', (req, res) => {
  // const user_id = req.body.id;

  res.json({result: true})
});

module.exports = router;
