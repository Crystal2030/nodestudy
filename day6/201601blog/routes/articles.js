/**
 * Created by crystal on 3/21/16.
 */
var express = require('express');
var articleModel = require('../models/article');
var auth = require('../auth');
var path = require('path');
var multer = require('multer');
var router = express.Router();

//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存文件的路径
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });


//提交文章数据 里面放置的是文件域的名字
router.get('/add', auth.checkLogin, function(req, res){
    res.render('article/add', {title: 'Post article'});
});

router.post('/add', auth.checkLogin, upload.single('img'), function(req, res){
    var article = req.body;
    var user = req.session.user;
    article.user = user._id;//user is object
    if(req.file){
        article.img = '/images/'+req.file.filename;
    }
    articleModel.create(article, function(err, doc){
        if(err){
            console.log(err);
            req.flash('error', err.errors);
            return res.redirect('/articles/add');
        }else{
            console.log('doc', doc);
            req.flash('success', 'Post successfully!');
            res.redirect('/');
        }
    })
});

module.exports = router;