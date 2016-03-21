/**
 * Created by crystal on 3/21/16.
 */
var express = require('express');
var router = express.Router();

router.get('/add', function(req, res){
    res.render('article/add', {title: 'add page'});
});

router.post('/add', function(req, res){

});

module.exports = router;