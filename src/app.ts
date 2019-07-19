if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

import Koa from 'koa'
import moment from 'moment'
import render from './modules/koaejs'
// const render = require('./modules/koaejs')
import koaBody from 'koa-body'
import reg_route from './modules/reg_route'
import onerror from './modules/onerror'
const app = new Koa()
//静态文件
if (process.env.NODE_ENV == 'production') {
    app.use(require('koa-static')('public', { maxAge: 2 * 60 * 1000 }))
}
else {
    app.use(require('koa-static')('public'))
}
app.use(onerror())
app.use(koaBody())
render(app, {
    root: 'views',
    layout: 'shared/layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(async (ctx, next) => {
    ctx.state.thistime = moment().format('yyyy-mm-dd HH:MM:ss')
    ctx.state.machine_num = process.env.SERVER_NUM || 0
    await next()
})
//注册路由
reg_route(app)
app.use(async (ctx, next) => {
    ctx.status = 404
    await ctx.render('shared/404', { title: '404', layout: false })
})
const port = 56856
app.listen(port, function () {
    console.info(`测试demo(ENV：${process.env.NODE_ENV})已启动，监听端口 ${port}`);
});