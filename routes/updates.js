const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);

  req.io.of('/updates').emit('update',req.body);

  res.json({errors: []});
});

module.exports = router;
