/**
 * _v的用途
 * versionKey 版本锁
 * 先读出来-在更新-在保存
 * 100
 * A 100 v=1.0 200 保存 判断现在数据库里的版本跟我当时查出来的是否一样
 * B 100 v=1.0 0 保存
 */

//1.加载模块
var mongoose = require("mongoose");
//2.连接数据库mongod 服务端 mongo客户端
var db = mongoose.connect("mongodb://localhost:27017/zfpx");
//连接成功会执行error回调
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
//连接成功会执行open回调
db.connection.on("open", function () {
    console.log("数据库连接成功");
});

var personSchema = new mongoose.Schema({
    hobby: { type:String }
},{
    collection: 'person'//手工指定集合的名称
});

var PersonModel = mongoose.model('person', personSchema);

PersonModel.findOne({}, function(err, doc){
    /*console.log(doc);
    doc.hobby.push('1');
    doc.save();*/
})
