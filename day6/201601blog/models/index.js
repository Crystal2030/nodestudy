/**
 * Created by crystal on 3/21/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');

var settings = require('../settings');

mongoose.connect(settings.url);//connect database

mongoose.model('User', new Schema(models.User));
mongoose.model('Article', new Schema(models.Article));

//此文件负责向外暴露模型,因为Model赋给了global作为属性，那就意味着在程序任何地方都可以调用了
global.Model = function(type){
    return mongoose.model(type);
}