
import Router from 'koa-router'
let router = new Router();


//首页
router.get('/', async (ctx:any, next:any) => {
  ctx.body = 'index'
})


module.exports = router