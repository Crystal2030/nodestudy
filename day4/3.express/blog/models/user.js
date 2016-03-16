var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//store user's information
User.prototype.save = function(callback) {
    //user info documentation which will be stored into db
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    //open db
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//error，return err message
        }
        //read users set
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//error，return err message
            }
            //insert user data into users set
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]);//success！err is null, and return user documentation which was stored
            });
        });
    });
};

//read user's information
User.get = function(name, callback) {
    //open db
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//error，return err message
        }
        //read users set
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//error，return err message
            }
            //find a documentation that  username:name value:name
            collection.findOne({
                name: name
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//error，return err message
                }
                callback(null, user);//success！return user info
            });
        });
    });
};
