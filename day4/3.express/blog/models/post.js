/**
 * Created by cdc on 15/10/31.
 */
var mongodb = require('./db'),
    markdown = require('markdown').markdown;

function Post(name, title,tags, post){
    this.name = name;
    this.title = title;
    this.tags = tags;
    this.post = post;
}

module.exports = Post;

//stored a article and info
Post.prototype.save = function(callback){
    var date = new Date();
    //stored various of time format
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };

    //stored into db
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        tags: this.tags,
        post: this.post,
        comments: []
    };

    //open db
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //read posts set
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //insert the documentation into posts set
            collection.insert(post, {
                safe: true
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);//fail, return err
                }
                callback(null);//return err = null
            });
        });
    });

};

//read article and related info
Post.getFive = function(name, page, callback){
    //open db
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //read posts set
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if(name){
                query.name = name;
            }
            collection.count(query, function(err, total){
                //find article based on the query object
                collection.find(query,{
                    skip: (page-1)*5,
                    limit: 5
                }).sort({
                    time: -1
                }).toArray(function(err, docs){
                    mongodb.close();
                    if(err){
                        return callback(err);//error, return err
                    }
                    //parse markdwon to html
                    docs.forEach(function(doc){
                        doc.post = markdown.toHTML(doc.post);
                    });
                    callback(null, docs, total);//success, return query result with array
                });
            });
        });
    });
};

//Get one article
Post.getOne = function(name, day, title, callback){
  //open db
    mongodb.open(function(err, db){
       if(err){
          return callback(err);
       }
        //read posts set
        db.collection('posts', function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }
            //find one article based on author, post time, and article title
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function(err, doc){
               mongodb.close();
                if(err){
                    return callback(err);
                }
                //parse markdown to html
                if(doc){
                    doc.post = markdown.toHTML(doc.post);
                    doc.comments.forEach(function(comment){
                        comment.content = markdown.toHTML(comment.content);
                    });
                }
                callback(null, doc);
            });
        });
    });
};

//return originar post content(markdown format)
Post.edit = function(name, day, title, callback){
  //open db
    mongodb.open(function(err, db){
       if(err){
           return callback(err);
       }
        //read posts collection
        db.collection('posts', function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function(err, doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, doc);//return the article that find
            })
        });
    });
};

Post.update = function(name, day, title, post, callback){
    //open db
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //read posts collection
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            },{
                $set: {post: post}
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};


Post.remove = function(name, day, title, callback){
  //open db
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //read posts collection
        db.collection('posts', function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }
            collection.remove({
                "name": name,
                "time.day": day,
                "title": title
            },{
                w: 1
            }, function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Post.getArchive = function(callback){
    //open db
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        //read posts collection
        db.collection('posts', function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }
            collection.find({}, {
                "name": 1,
                "time": 1,
                "title": 1
            }).sort({
                time: -1
            }).toArray(function(err, docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, docs);
            })
        });
    })
}