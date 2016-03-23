/**
 * Created by crystal on 3/21/16.
 */
var express = require('express');
var articleModel = require('../models/article');
var auth = require('../auth');
var router = express.Router();


router.get('/add', auth.checkLogin,  function(req, res){
    res.render('article/add', {title: 'Post article'});
});

router.post('/add', auth.checkLogin,  function(req, res){
    var article = req.body;
    var user = req.session.user;
    article.user = user;//user is object
    articleModel.create(article, function(err, doc){
        if(err){
            req.flash('error', err);
            return res.redirect('/articles/add');
        }else{
            console.log('doc', doc);
            req.flash('success', 'Post successfully!');
            res.redirect('/');
        }
    })
});

module.exports = router;