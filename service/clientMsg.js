const ClientMsgModel = require('../models/clientMsg');
const axios = require('axios');

class ClientMsgDb {

	async getAddress(ip) {
		try {
			return await axios.get(`https://restapi.amap.com/v3/ip?ip=${ip}&key=5e91b92a1d8714b64202548a8ec4cee0`);
		} catch (err) {
			console.log(err);
		}
	}
	async save(obj) {
		try {
			return await ClientMsgModel(obj).save();
		} catch (err) {
			console.log(err);
		}
	}
	async queryIp(ip) {
		try {
			return await ClientMsgModel.findOne({ ip });
		} catch (err) {
			console.log(err);
		}
	}
	async queryAll() {
		try {
			return await ClientMsgModel.find({});
		} catch (err) {
			console.log(err);
		}
	}
	async updateIpVisitCount(ip, visitCount) {
		try {
			return await ClientMsgModel.updateOne({ ip }, { visitCount });
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new ClientMsgDb();


