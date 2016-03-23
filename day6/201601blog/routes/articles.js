/**
 * Created by crystal on 3/21/16.
 */
var express = require('express');
var router = express.Router();
var articleModel = require('../models/article');

router.get('/add', function(req, res){
    res.render('article/add', {title: 'Post article'});
});

router.post('/add', function(req, res){
    var article = req.body;
    var user = req.session.user;
    article.user = user._id;
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