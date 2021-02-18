const Koa = require('koa')
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const statics =  require('koa-static')
const cors = require('koa2-cors')
const path = require('path')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const staticPath = './static';

// 导入路由文件
const index = require('./routers/index');
const clientMsg = require('./routers/clientMsg');

//解析请求体
app.use(bodyparser());

//允许跨域
app.use(cors())

//处理静态资源
app.use(statics(
  path.join(__dirname, staticPath)
))

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 装载所有子路由
router.use('/index', index.routes()); 
router.use('/client', clientMsg.routes()); 

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

//设置代理头字段信任
app.proxy = true;

//如果不指定hostname(0.0.0.0)，服务器会接受ipV6的主机访问（如果存在的话），也就是说访问服务器的ip会是::ffff:开头的。
app.listen(3000, '0.0.0.0' , () => {
    console.log('localhost:3000')
})

