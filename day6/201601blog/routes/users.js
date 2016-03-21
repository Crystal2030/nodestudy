var express = require('express');
var crypto = require('crypto');//core module of nodejs
var router = express.Router();


//用户注册
router.get('/reg', function (req, res, next) {
    res.render('user/reg', {
        title: 'Register',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
//提交用户注册表单时的处理
router.post('/reg', function (req, res, next) {
    console.log(111);
    var user = req.body,
        password = req.body.password,
        repassword = req.body.repassword;

    //check password and confirm_password
    if(password != repassword){
        req.flash('error', 'The password and its confirm are not the same!');
        return res.redirect('back');
    }

    password = md5(req.body.password);

    var userModel = new Model('User');
    var userEntity = userModel(user);
    userEntity.save(function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }else{
            console.log(user);
        }
        req.session.user = user;//user info store into session
        req.flash('success', 'Register successfully!');
        res.redirect('/');
    })

});

//用户注册
router.get('/login', function (req, res, next) {
    res.render('user/login', {title: 'Login'});
});
//提交用户注册表单时的处理
router.post('/reg', function (req, res, next) {

});

//登出
router.get('/logout', function (req, res, next) {

});

function md5(value){
    //Calculates the digest of all of the data passed to be hashed (using the hash.update() method). The encoding can be 'hex', 'binary' or 'base64'.
    //The Hash object can not be used again after hash.digest() method has been called.
    return crypto.createHash('md5').update(value).digest('hex');
}

module.exports = router;
