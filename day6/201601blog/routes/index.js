var express = require('express');
var router = express.Router();
var articleModel = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  articleModel.find({}).exec(function(err, docs){
    res.render('index', {
      title: 'Home',
      articles: docs
    });
  });

});




module.exports = router;
