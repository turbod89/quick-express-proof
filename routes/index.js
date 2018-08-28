const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.local.connection.query('select * from 1', function (error,results, fields) {
    console.log(results);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
