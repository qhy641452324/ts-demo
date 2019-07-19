import minimist from "minimist"
import webpack from "webpack"
let webpack_config = require("../webpack.config")
const compiler = webpack(webpack_config);

let argv = minimist(process.argv.slice(2))


if (argv.w) {
  console.info('webpack开始监听')
  const watching = compiler.watch({
    
  }, (err, stats) => {
    if (err) { 
      console.error(err)
    }
    else{
      let result_json = stats.toJson({
        assets: true,
        hash: false,
        modules: false,
        chunks: false
      })
      //console.info(result_json);
      if (result_json.errors.length > 0) {
        result_json.errors.forEach(v=>{
          console.error('ERROR in ' + v)
        })
      }
      else{
        console.info('[' + (new Date()).toLocaleTimeString() + '] webpack编译成功' + ' 耗时:' + result_json.time + 'ms')
      }
      
    }
  });
}
else{
  compiler.run((err, stats) => {
    if (err) { 
      console.error(err)
    }
    else{
      let result_json = stats.toJson({
        assets: true,
        hash: false,
        modules: false,
        chunks: false
      })
      //console.info(result_json);
      if (result_json.errors.length > 0) {
        result_json.errors.forEach(v=>{
          console.error('ERROR in ' + v)
        })
      }
      else{
        console.info('[' + (new Date()).toLocaleTimeString() + '] webpack编译成功' + ' 耗时:' + result_json.time + 'ms')
      }
      
    }
  });
}


