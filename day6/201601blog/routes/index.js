var express = require('express');
var router = express.Router();
var articleModel = require('../models/article');
var userModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  articleModel.find({}).populate("'"+userModel.modelName+"'").exec(function(err, docs){
    res.render('index', {
      title: 'Home',
      articles: docs
    });
  });



});




module.exports = router;
