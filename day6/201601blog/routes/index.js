var express = require('express');
var router = express.Router();
var articleModel = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  //查出来的user是ID，需要通过populate转成对象
  articleModel.find({}).populate("user").exec(function(err, docs){
    console.log(docs);
    if(err){
      req.flash('error', error);
      return res.redirect('/');
    }else{
      res.render('index', {
        title: 'Home',
        articles: docs
      });
    }

  });



});




module.exports = router;
