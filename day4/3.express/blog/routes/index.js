var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Comment = require('../models/comment.js');

module.exports = function (app) {
    app.get('/', function(req, res){
        //judge whether is the first page, and covert it to number type, because req.query.p is string
        var page = parseInt(req.query.p) || 1;
        Post.getFive(null, page , function(err, posts, total){
            if(err){
                posts = [];
            }
            res.render('index', {
                title: 'Home Page',
                posts: posts,
                page: page,
                isFirstPage: (page-1) == 0,
                isLastPage: ((page-1) * 5 + posts.length) == total,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            })
        })

    });
    app.get('/reg', function(req, res){
        res.render('reg', {
            title: 'Register',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
    app.post('/reg', function(req, res){
        var name = req.body.name,
         password = req.body.password,
         password_re = req.body['password-repeat'];
         //check password and passrword_re is consistence
         if(password_re!=password){
         req.flash('error', 'Two input password is not consistent');
         return res.redirect('/reg');
         }
         //product md5 value
         var md5 = crypto.createHash('md5'),
         password = md5.update(req.body.password).digest('hex');
         var newUser = new User({
         name: req.body.name,
         password: password,
         email: req.body.email
         });
         //check whether the user is exist
         User.get(newUser.name, function(err, user){
         if(err){
         req.flash('error', err);
         return res.redirect('/');
         }
         if(user){
         req.flash('error', 'User already exists');
         return res.redirect('/reg');
         }
         //if user not exists, create new user
         newUser.save(function(err,user){
         if(err){
         req.flash('error', err);
         return res.redirect('/reg');
         }
         req.session.user = user;//user info store into session
             console.log(req.session.user);
         req.flash('success', 'Register success!');
         res.redirect('/');//after registering redirect to home page
         });
         });
    });
    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res){
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
    app.post('/login', checkNotLogin);
    app.post('/login', function(req, res){
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        //check whether the user exists
        User.get(req.body.name, function(err, user){
            if(!user){
                req.flash('error', 'User not exists!');
                return res.redirect('/login');
            }
            //check password and passrword_re is consistence
            if(user.password != password){
                req.flash('error', 'Password is incorrect!');
                return res.redirect('/login');
            }
            //after username and password matches, stored user info into session
            req.session.user = user;
            req.flash('success', 'Login success!');
            res.redirect('/');
        });
    });
    app.get('/post', checkLogin);
    app.get('/post', function(req, res){
        res.render('post', {
            title: 'Post',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
    app.post('/post', checkLogin);
    app.post('/post', function(req, res){
        var currentUser = req.session.user,
            tags = [req.body.tag1, req.body.tag2, req.body.tag3]
            post = new Post(currentUser.name, req.body.title, req.body.post);
        post.save(function(err){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', 'Post successfully!');
            return res.redirect('/');
        })
    });
    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res){
        req.session.user = null;
        req.flash('success', 'Logout successfully!');
        res.redirect('/');
    });
    app.get('/upload', checkLogin);
    app.get('/upload', function(req, res){
        res.render('upload',{
            title: 'Upload',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/upload', checkLogin);
    app.post('/upload', function(req, res){
        req.flash('success', 'Upload successfully!');
        return res.redirect('/upload');
    });

    app.get("/archive", function(req, res){
        Post.getArchive(function(err, posts){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('archive', {
                title: 'Archive',
                posts: posts,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get("/blog/:name", function(req,res){//get all article of the user
        var page = parseInt(req.query.p) || 1;
        //check user exists or not
        User.get(req.params.name, function(err, user){
            if(!user){
                req.flash("error", "User not exists!");
                return res.redirect("/");
            }
            Post.getFive(user.name, page, function(err, posts, total){
               if(err){
                   req.flash("error", err);
                   return res.redirect('/');
               }
                res.render('user', {
                    title: user.name,
                    posts: posts,
                    page: page,
                    isFirstPage: (page-1) == 0,
                    isLastPage: ((page-1)*5 + posts.length) == total,
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        });
    });
    app.get("/blog/:name/:day/:title", function(req,res){//get one article
       Post.getOne(req.params.name, req.params.day, req.params.title, function(err, post){
          if(err){
              req.flash("error", err);
              return res.redirect('/');
          }
           res.render('article', {
               title: req.params.title,
               post: post,
               user: req.session.user,
               success: req.flash('success').toString(),
               error: req.flash('error').toString()
           })
       });
    });

    app.post('/blog/:name/:day/:title', function (req, res) {
        var date = new Date(),
            time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var comment = {
            name: req.body.name,
            email: req.body.email,
            website: req.body.website,
            time: time,
            content: req.body.content
        };
        var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
        newComment.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', 'Leave message successfully!');
            res.redirect('back');
        });
    });

    app.get('/edit/:name/:day/:title', function(req, res){
       var currentUser = req.session.user;
        Post.edit(currentUser.name, req.params.day, req.params.title, function(err, post){
            if(err){
                req.flash("error", err);
                return res.redirect('back');
            }
            res.render('edit', {
                title: 'Edit',
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });
    app.post('/edit/:name/:day/:title', checkLogin);
    app.post('/edit/:name/:day/:title', function(req,res){
        var currentUser = req.session.user;
        Post.update(currentUser.name, req.params.day,req.params.title,req.body.post, function(err, post){
            var url = encodeURI('/blog/'+ req.params.name + '/' + req.params.day + '/' + req.params.title);
            if(err){
                req.flash("error", err);
                return res.redirect(url);//error, return to article page
            }
            req.flash('success', 'Edit successfully!');
            res.redirect(url);
        })
    });
    app.get('/remove/:name/:day/:title', checkLogin);
    app.get('/remove/:name/:day/:title', function(req, res){
        var currentUser = req.session.user;
        Post.remove(currentUser.name, req.params.day, req.params.title, function(err){
            if(err){
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', 'Remove successfully!');
            return res.redirect('/');
        });
    });




    function checkLogin(req,res,next){
        if(!req.session.user){
            req.flash('error', 'Not logged in!');
            res.redirect('/login');
        }
        next();
    }
    function checkNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error', 'Already logged in!');
            res.redirect('back');
        }
        next();
    }
}