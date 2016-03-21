/**
 * Created by crystal on 3/21/16.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    User: {
        //User data model
        username:{type:String, required: true},
        password:{type:String, required: true},
        email:{type:String, required:true}
    },
    Article:{
        //article data model
        user:{type:ObjectId,ref:'User'},
        title: String,
        content: String,
        createAt: {type: Date, default: Date.now}
    }
}