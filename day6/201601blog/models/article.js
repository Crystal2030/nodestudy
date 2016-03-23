/**
 * Created by crystal on 3/22/16.
 */
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var articleSchema = new mongoose.Schema({
    //User data model
    title:{type:String, required: true},
    content:{type:String, required: true},
    img: String,
    createAt: {type:Date, default:Date.now},
    user: {type:ObjectId, ref:'user'}
});

var articleModel = mongoose.model('article', articleSchema);


module.exports = articleModel;