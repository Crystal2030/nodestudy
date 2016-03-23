/**
 * Created by crystal on 3/22/16.
 */
var mongoose = require('mongoose');
var userModel = require('../models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;

var articleSchema = new mongoose.Schema({
    //User data model
    title:{type:String, required: true},
    content:{type:String, required: true},
    createAt: {type:Date, default:Date.now},
    user: {type:ObjectId, ref:'"' + userModel.modelName + '"'}
});

var articleModel = mongoose.model('article', articleSchema);


module.exports = articleModel;