var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/frontlog', function(req, res, next) {
    console.log(res,req)
  });
  
  module.exports = router;