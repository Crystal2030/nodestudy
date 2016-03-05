/**
 * Created by Crystal on 2016/3/5.
 */
var Person = require('./person.js');
var Person2 = require('./person2.js');

Person.person();
Person2.person();

console.log(Object.keys(require.cache));
