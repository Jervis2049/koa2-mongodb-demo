const Router = require('koa-router')
const clientMsgService = require('../service/clientMsg');
const router = new Router()

router.post('/record', async (ctx) => {

	try {
		let ip = ctx.request.ip;
		let { appVersion, platform, winInnerHeight, winInnerWidth } = ctx.request.body;
		let queryRes = await clientMsgService.queryIp(ip)
		if (queryRes) {
			let { visitCount } = queryRes;
			visitCount++;
			clientMsgService.updateIpVisitCount(ip, visitCount)
			ctx.body = { code: 2010, msg: '更新成功' };
		} else {
			let addressRes = await clientMsgService.getAddress(ip)
			if (addressRes) {
				let { province, city } = addressRes.data;
				clientMsgService.save({
					ip,
					navigator: {
						appVersion,
						platform,
						winInnerHeight,
						winInnerWidth,
					},
					address: province + city,
					visitCount: 1
				})
				ctx.body = { code: 200, msg: '保存成功' };
			} else {
				ctx.body = { code: 5010, msg: '获取地址失败' };
			}
		}
	} catch (err) {
		console.log(err);
	}

})

router.get('/list', async (ctx) => {

	try {
		let result = await clientMsgService.queryAll()
		if (result) {
			ctx.body = { code: 200, result };
		} else {
			ctx.body = { code: 5020, msg: '获取列表失败' };
		}
	} catch (err) {
		console.log(err);
	}

})

module.exports = router