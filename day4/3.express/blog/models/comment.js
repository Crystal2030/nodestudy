/**
 * Created by cdc on 15/11/11.
 */
var mongodb = require('./db');

function Comment(name, day, title, comment){
    this.name = name;
    this.day = day;
    this.title = title;
    this.comment = comment;
}

module.exports = Comment;

//save one comment message
Comment.prototype.save = function(callback){
    var name = this.name,
        day = this.day,
        title = this.title,
        comment = this.comment;
    //open db
    mongodb.open(function(err, db){
       if(err){
           return callback(err);
       }
       db.collection('posts', function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }
           //find a document based on username, time and title, and add one message to comments Array
           collection.update({
               "name": name,
               "time.day": day,
               "title": title
           },{
               $push: {"comments": comment}
           },function(err){
               mongodb.close();
               if(err){
                   return callback(err);
               }
               callback(null);
           });
       });
    });
}