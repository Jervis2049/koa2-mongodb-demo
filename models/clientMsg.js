const mongoose = require('../db')
const Schema = mongoose.Schema;

//定义字段类型
const ClientMsgSchema = new Schema({
  ip: String,
  address: String,
  visitCount: Number,
  navigator: Object
});

//clientMsg为collection名称
module.exports = mongoose.model('clientMsg', ClientMsgSchema); 
