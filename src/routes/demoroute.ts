/**
 * demo
 */
import Router from 'koa-router'
let router = new Router();


router.prefix('/demo')

// router.use(pathlevel())


router.get('/(index|index.html)?', async (ctx:any, next:any) => {
    if(ctx.path == '/demo'){
        ctx.redirect('/demo/')
        return
    }
    await ctx.render('demo/index', {
        title: '首页',
        keywords: '',
    })
})


module.exports = router