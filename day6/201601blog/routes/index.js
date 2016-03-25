var express = require('express');
var router = express.Router();
var articleModel = require('../models/article');
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
  //查出来的user是ID，需要通过populate转成对象
  /*articleModel.find({}).populate("user").exec(function(err, docs){
    if(err){
      req.flash('error', error);
      return res.redirect('/');
    }else{
      docs.forEach(function(article){
        article.content = markdown.toHTML(article.content);
      })
      res.render('index', {
        title: 'Home',
        articles: docs
      });
    }

  });*/

  res.redirect('/articles/list/1/2')

});




module.exports = router;
