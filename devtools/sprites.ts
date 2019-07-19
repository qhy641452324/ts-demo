/**
 * 生成雪碧图和对应的less文件
 */


import glob from 'glob'
import fs from 'fs'
import path from 'path'


function sprite() {
  // Load in dependencies
  var Spritesmith = require('spritesmith')

  // Generate our spritesheet
  var sprites = glob.sync('./public/css/icons/*.*');
  //console.info(sprites);
  Spritesmith.run({
    src: sprites,
    padding: 5
  }, function handleResult(err: any, result: { image: any; coordinates: any; }) {
    if (err == null) {
      //console.info(result);
      fs.writeFileSync('./public/css/img/sprites.png', result.image);
      make_less(result.coordinates);
    }
    else{
      console.error(err);
    }
    
    return false;
    // result.image; // Buffer representation of image
    // result.coordinates; // Object mapping filename to {x, y, width, height} of image
    // result.properties; // Object with metadata about spritesheet {width, height}
  });
}

function make_less(coordinates: { [x: string]: any; }) {
  let lesstext = [];
  lesstext.push(`
.icon{
  display: inline-block;
  background-image: url(img/sprites.png);
  background-repeat: no-repeat;
}
`) //_background-image: url(/src/css/img/sprites.gif);
  console.info(coordinates);
  for (let i in coordinates) {
    let iconname = path.basename(i, '.png');
    let coord = coordinates[i];
    lesstext.push(`
@icon_${iconname}_position: -${coord.x}px -${coord.y}px;
.icon_${iconname}{
  width: ${coord.width}px;
  height: ${coord.height}px;
  background-position: @icon_${iconname}_position;
}
`)
  }

  fs.writeFile('./less/shared/sprites.less', lesstext.join(''), function () {
    
  });
}




  sprite();
