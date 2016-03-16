/**
 * Created by crystal on 3/16/16.
 */
var express = require('express');
var router = express.Router();

//Get home page
router.get('/', function(req, res){
    res.render('index', {title: 'Express'});
});

module.exports = router;
