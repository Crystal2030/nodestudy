var express = require('express');
var router = express.Router();

/* GET users listing.
这里的/当前路由下的根目录，不包含一级目录
*/
//用户注册
router.get('/reg', function(req, res){
  res.render('user/reg');
});
//提交用户注册表单
router.post('/reg', function(req, res){
  res.send('reg');
});

//用户登录
router.get('/login', function(req, res){
  res.render('user/login');
});
//提交用户登录表单
router.post('/login', function(req, res){
  res.send('login');
});

router.get('/logout', function(req,res){
  res.render('user/login');
})

module.exports = router;
