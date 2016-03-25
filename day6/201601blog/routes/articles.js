/**
 * Created by crystal on 3/21/16.
 */
var express = require('express');
var auth = require('../auth');
var path = require('path');
var multer = require('multer');
var markdown = require('markdown').markdown;
var router = express.Router();
var articleModel = require('../models/article');
var async = require('async');

//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存文件的路径
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage: storage});


//提交文章数据 里面放置的是文件域的名字
router.get('/add', auth.checkLogin, function (req, res) {
    res.render('article/add', {title: 'Post article'});
});

router.post('/add', auth.checkLogin, upload.single('img'), function (req, res) {
    var article = req.body;
    var user = req.session.user;
    article.user = user._id;//user is object
    if (req.file) {
        article.img = '/images/' + req.file.filename;
    }
    articleModel.create(article, function (err, doc) {
        if (err) {
            req.flash('error', err.errors);
            return res.redirect('/articles/add');
        } else {
            req.flash('success', 'Post successfully!');
            res.redirect('/');
        }
    })
});


router.get('/detail/:_id', auth.checkLogin, function (req, res) {
    async.parallel([function(callback){
        articleModel.findById(req.params._id).exec(function (err, doc) {
            if (err) {
                return res.redirect('/');
            } else {
                doc.content = markdown.toHTML(doc.content);
                res.render('article/detail', {
                    title: 'View article',
                    article: doc
                });
            }
        });
    },function(callback){
        articleModel.update({_id:req.params._id},{$inc:{pv:1}},callback);
    }], function(err, result){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            res.render('article/detail',{
                title:'View article',
                article:result[0]
            });
        }
    })

});

router.get('/remove/:_id', auth.checkLogin, function (req, res) {
    articleModel.remove(req.params._id).exec(function (err, doc) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        } else {
            req.flash('success', 'Remove successfully!');
            res.redirect('/');
        }
    })
});

//edit an article
router.get('/edit/:_id', auth.checkLogin, function (req, res) {
    articleModel.findById(req.params._id).exec(function (err, doc) {
        if (err) {
            return res.redirect('/');
        } else {
            res.render('article/edit', {
                title: 'View article',
                article: doc
            });
        }
    });
});

router.post('/edit/:_id', auth.checkLogin,upload.single('img'), function (req, res) {
    var article = req.body;
    var conditions = {_id: req.params._id};
    var setObj = {title: article.title, content: article.content};
    if (req.file) {
        setObj.img = '/images/' + req.file.filename;
    }
    articleModel.update(conditions, {$set: setObj}).exec(function (err, doc) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        } else {
            console.log(doc);
            req.flash('success', 'Update successfully!');
            req.flash('success', 'Update successfully!');
            res.redirect('/');
        }
    })
});


//search pagination
router.get('/list/:pageNum/:pageSize', auth.checkLogin, function(req, res){
    var pageNum = parseInt(req.params.pageNum);
    var pageSize = parseInt(req.params.pageSize);
    var query = {};
    if(req.query.keyword){
        req.session.keyword = req.query.keyword;
        query['title'] = new RegExp(req.query.keyword, 'i');
    }
    articleModel.count(query, function(err, count){
        articleModel.find(query).skip((pageNum-1)*pageSize).limit(pageSize).sort({createAt:-1}).populate("user").exec(function(err, docs){
            if(err){
                req.flash('error', error);
                return res.redirect('/');
            }else{
                docs.forEach(function(article){
                    article.content = markdown.toHTML(article.content);
                })
                res.render('index', {
                    title: 'Home',
                    articles: docs,
                    keyword: req.query.keyword,
                    pageNum: pageNum,
                    pageSize: pageSize,
                    totalPage: Math.ceil(count/pageSize)
                });
            }

        });
    })

});

//comment
router.post('/comment', auth.checkLogin, function(req, res){
    var user = req.session.user;
    var conditions = {_id:req.body._id};
    var pushObj = {comments:{user:user._id,content:req.body.content}};
    articleModel.update(conditions,{$push:pushObj}).populate('user').exec(function(err, doc){
        if(err){
            req.flash('error', err);
            res.redirect('back');
        }else{
            req.flash('success', 'Comment successfully!');
            res.redirect('back');
        }
    });
});

module.exports = router;