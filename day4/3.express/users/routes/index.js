/**
 * Created by crystal on 3/16/16.
 */
var User = require('../models/user.js');

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Home',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()

        });
    });

    app.get('/reg', function(req, res){
        res.render('reg', {
            title: 'Register',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/reg', function(req, res){
        var username = req.body.username,
            password = req.body.password,
            confirm_password = req.body['confirm-password'],
            email = req.body.email;
        //check password and confirm_password
        if(password !== confirm_password){
            req.flash('error', 'The password and its confirm are not the same!');
            return res.redirect('/reg');
        }

        var newUser = new User({
            name: username,
            password: password,
            email: email
        });

        //check whether the user exists or not
        User.get(newUser.name, function(err, user){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            if(user){
                req.flash('error', 'User already exists!');
                return res.redirect('/reg');
            }
            newUser.save(function(err, user){
                if(err){
                    console.log(err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;//user info store into session
                req.flash('success', 'Register successfully!')
                res.redirect('/');
            })
        })
    });

    app.get('/login', function(req, res){
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/login', function(req, res){
        var username = req.body.username,
            password = req.body.password;
        User.get(username, function(err, user){
            if(!user){
                req.flash('error', 'User not exists!');
                return res.redirect('/login');
            }
            //check whether the password is consistent
            if(user.password !== password){
                req.flash('error','Password is not correctly!');
                return res.redirect('/login');
            }
            req.session.user = user;
            req.flash('success', 'Login successfully!');
            res.redirect('/');
        });
    });

};