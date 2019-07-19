/**
 * 处理错误中间件
 */
import Koa from 'koa'

export default function () {
  return async function(ctx: Koa.Context, next: () => Promise<any>) {
    try {
      await next();
    } catch (err) {
      console.error(err)

      if(ctx.url.indexOf('/api/') == 0){

        let is_show_message = false //是否是需要暴露给前端的错误状态
        if (err.message.indexOf('showerror') == 0) {
          is_show_message = true
        }

        ctx.status = 200
        if (process.env.NODE_ENV !== "production") {
            if (is_show_message) {
              err.message = err.message.substring(9)           
            }

            ctx.body = {
                re: false,
                message: err.message,
                result: err.stack
            }
        }
        else{
          if (is_show_message) {
            ctx.body = {
                re: false,
                message: err.message.substring(9)
            }             
          }
          else{
            ctx.body = {
                re: false,
                message: 'system error'
            }             
          }
        }
      }
      else{
        if (process.env.NODE_ENV !== "production") {
          
          ctx.body = `<textarea style="width: 800px; height: 400px; margin:0 auto;display:block;font-family: consolas; font-size:14px; line-height:175%; overflow:auto; border:0;background-color:#f3f3f3; padding:20px;">ERROR\n${err.stack}</textarea>`
        }
        else{
            await ctx.render('shared/error', {
              title: '500',
              layout: false
            })            
        }
      }
      
    }
  }
}