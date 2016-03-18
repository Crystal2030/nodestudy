/**
 * Created by ziwen.xu on 2016/3/18.
 */
var mongoose = require("mongoose");
//var db = mongoose.connect("mongodb://localhost:27017/myuser");
var db = mongoose.connect("mongodb://123.57.143.189:27017/zfpx");

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功");
});


var PersonSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    time : { type:Date, default:Date.now },
    email: { type:String,default:''}
});
// 创建Model:1.集合名称;2.集合的Schema结构对象，满足这两个条件，我们就可以操作数据库啦。
var PersonModel = db.model("person", PersonSchema);
//Entity —— 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。
var personEntity = new PersonModel({
    name : "zfpx",
    age  : 6,
    email: "zfpx@qq.com"
});
console.log(personEntity.name); // zfpx
console.log(personEntity.age); // 6

personEntity.save(function(error,doc){
    if(error){
        console.log("error :" + error);
    }else{
        console.log(doc);
    }
});

PersonModel.find({},function(error,docs){
    //若没有向find传递参数，默认的是显示所有文档
    console.log(docs);
});

PersonModel.find({ "age": 6 }, function (error, docs) {
    if(error){
        console.log("error :" + error);
    }else{
        console.log(docs); //docs: age为6的所有文档
    }
});

PersonModel.create({name:'zfpx', age:7}, function(error,doc){
    if(error){
        console.log(error);
    }else{
        console.log(doc);
    }
})

var personEntity = new PersonModel({name:'zfpx',age:9});

personEntity.save(function(error,doc){
    if(error){
        console.log(error);
    }else{
        console.log(doc);
    }
});

var conditions = {name:'zfpx'};
var update = {$set: {age: 100}};
//更新数据
PersonModel.update(conditions, update, function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Update success!')
    }
});
//删除数据
PersonModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});