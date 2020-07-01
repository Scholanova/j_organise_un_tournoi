var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bracket', function(req, res, next) {
  res.render('bracket', { title: 'Express' });
});

module.exports = router;
