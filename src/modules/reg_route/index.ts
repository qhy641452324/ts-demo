/**
 * 注册路由
 */

import Koa from 'koa'
import path from "path";
import glob from 'glob';


export default function(app: Koa){
  let rlist = glob.sync('*', {
    cwd: path.join(__dirname, '../../routes/')
  })
  
  rlist.forEach((v:string)=>{
    let router = require(path.join(__dirname, '../../routes/') + v)
    app.use(router.routes()).use(router.allowedMethods())
  })
}