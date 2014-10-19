var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/about', function( req, res ){ 
    res.render('pages/about');
});

module.exports = router;