const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx) => {
    let title = "Index"
    await ctx.render('index', {
        title
    })
})

module.exports = router