import less from 'less'
import fs from 'fs-extra'
import chokidar from 'chokidar'
import path from 'path'
import glob from "glob"
import minimist from "minimist";

let argv = minimist(process.argv.slice(2))

/**
 * 生成less
 * 
 * @param {any} lesspath 
 */
async function makeLess(lesspath: string, outdir: string) {
  let lessfile = await fs.readFile(lesspath, 'utf-8')
  less.render(lessfile, {
      paths: ['./less/']
    }, function (e, output) {
      if (e) {
        console.error(e);
      }
      else{
        
        // if (output.css.length == 0) {
        //   makeLess(lesspath)

        // }
        // else{
          fs.writeFile(
            path.join(outdir, path.basename(lesspath, '.less') + '.css'),
            output.css, 'utf-8'
          ).then(function(){
            console.info(lesspath + ' 编译成功')
          })
                       
        // }
   
      }
    });
}


if (argv.w) {
  var less_watcher = chokidar.watch('./less/**/*.less');
  console.info('开始监听./less/*.less');
  less_watcher.on('change', lesspath => {
    var lessfile = glob.sync('./less/*.less')
    lessfile.forEach(v=>{
      makeLess(v, './public/css/')
    })
  })  
}
else{
  var lessfile = glob.sync('./less/*.less')
  console.info('开始编译./less/*.less');
  lessfile.forEach(v=>{
    makeLess(v, './public/css/')
  })
}
