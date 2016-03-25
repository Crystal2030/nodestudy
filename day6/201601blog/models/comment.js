/**
 * Created by crystal on 3/25/16.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = new mongoose.Schema({
    //User data model
    user:{type:ObjectId, ref:'user'},
    content:{type:String},
    createAt: {type:Date, default:Date.now}
});

var commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;