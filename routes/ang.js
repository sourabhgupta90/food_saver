var express = require('express');
var router = express.Router();

router.get('/', function( req, res ){ 
    res.send("hello angular");
    //res.render('views/pages/index');
});

module.exports = router;