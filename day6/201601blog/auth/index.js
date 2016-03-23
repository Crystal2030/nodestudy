/**
 * Created by Crystal on 2016/3/23.
 */
//check login，if user not login， redirect to home page
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        req.flash('error', 'Please login first!');
        res.redirect('/users/login');
    }
}

//check not login, if you have already logged in, redirect to home page
exports.checkNotLogin = function(req,res,next){
    if(!req.session.user){
        next();
    }else{
        req.flash('error', 'You have already logged in!');
        res.redirect('/');
    }
}