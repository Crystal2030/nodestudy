var express = require('express');
var crypto = require('crypto');//core module of nodejs
var userModel = require('../models/user');
var auth = require('../auth');

var router = express.Router();


//用户注册
router.get('/reg', auth.checkNotLogin, function (req, res) {
    res.render('user/reg', {
        title: 'Register'
    });
});
//提交用户注册表单时的处理
router.post('/reg', auth.checkNotLogin,  function (req, res) {
    var user = req.body,
        password = user.password,
        repassword = user.repassword;

    user.avatar = 'https://secure.gravatar.com/avatar/' + md5(user.email);

    //check password and confirm_password
    if(password != repassword){
        req.flash('error', 'The password and its confirm are not the same!');
        return res.redirect('back');
    }

    user.password = md5(user.password);

    userModel.create(user, function(err, doc){
        if(err){
            req.flash('error', err);
            return res.redirect('/users/reg');
        }else{
            console.log('doc', doc);
            req.session.user = doc;//user info store into session
            req.flash('success', 'Register successfully!');
            res.redirect('/');
        }

    })

});

//用户注册
router.get('/login', auth.checkNotLogin,  function (req, res) {
    res.render('user/login', {
        title: 'Login'
    });
});
//提交用户注册表单时的处理
router.post('/login', auth.checkNotLogin,  function (req, res) {
    if(req.body.username && req.body.password){
        var user = req.body;
        user.password = md5(user.password);
        userModel.findOne(user, function(err, doc){
            if(doc){
                req.session.user = doc;
                req.flash('success', 'Login successfully!');
                res.redirect('/');
            }else{
                req.flash('error', 'Username and password do not match or you do not have an account yet.');
                res.redirect('back');
            }
        })
    }else{
        req.flash('error', 'Username or password should not be empty!');
        return res.redirect('back');
    }
});

//登出
router.get('/logout', auth.checkLogin,  function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

function md5(value){
    //Calculates the digest of all of the data passed to be hashed (using the hash.update() method). The encoding can be 'hex', 'binary' or 'base64'.
    //The Hash object can not be used again after hash.digest() method has been called.
    return crypto.createHash('md5').update(value).digest('hex');
}

module.exports = router;
