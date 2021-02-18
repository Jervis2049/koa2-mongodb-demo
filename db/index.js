
const mongoose = require('mongoose')
const db = mongoose.connection;
const DB_URL = 'mongodb://localhost:27017/client_msg'

mongoose.connect(DB_URL, {useNewUrlParser:true,useUnifiedTopology: true})

db.on('connected',function() {
   console.log('Mongoose connection open to '+DB_URL);
});
/**
* 连接异常 error 数据库连接错误
*/
db.on('error',function(err) {
  console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
db.on('disconnected',function() {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose