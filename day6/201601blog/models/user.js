/**
 * Created by crystal on 3/22/16.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    //User data model
    username:{type:String, required: true},
    password:{type:String, required: true},
    email:{type:String, required:true},
    avatar: String
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;