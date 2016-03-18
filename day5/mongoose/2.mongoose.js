/**
 * Created by ziwen.xu on 2016/3/18.
 */
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://123.57.143.189:27017/zfpx");

var PersonSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
});

PersonSchema.static('findByName', function (name, callback) {
    return this.find({ name: name }, callback);
});

var PersonModel = db.model("person", PersonSchema );

PersonModel.findByName('zfpx', function (err, docs) {
    //docs所有名字叫zfpx的文档结果集
    console.log(docs);
});