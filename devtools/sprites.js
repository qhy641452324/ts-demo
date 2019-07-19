"use strict";
/**
 * 生成雪碧图和对应的less文件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var glob_1 = __importDefault(require("glob"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function sprite() {
    // Load in dependencies
    var Spritesmith = require('spritesmith');
    // Generate our spritesheet
    var sprites = glob_1["default"].sync('./public/css/icons/*.*');
    //console.info(sprites);
    Spritesmith.run({
        src: sprites,
        padding: 5
    }, function handleResult(err, result) {
        if (err == null) {
            //console.info(result);
            fs_1["default"].writeFileSync('./public/css/img/sprites.png', result.image);
            make_less(result.coordinates);
        }
        else {
            console.error(err);
        }
        return false;
        // result.image; // Buffer representation of image
        // result.coordinates; // Object mapping filename to {x, y, width, height} of image
        // result.properties; // Object with metadata about spritesheet {width, height}
    });
}
function make_less(coordinates) {
    var lesstext = [];
    lesstext.push("\n.icon{\n  display: inline-block;\n  background-image: url(img/sprites.png);\n  background-repeat: no-repeat;\n}\n"); //_background-image: url(/src/css/img/sprites.gif);
    console.info(coordinates);
    for (var i in coordinates) {
        var iconname = path_1["default"].basename(i, '.png');
        var coord = coordinates[i];
        lesstext.push("\n@icon_" + iconname + "_position: -" + coord.x + "px -" + coord.y + "px;\n.icon_" + iconname + "{\n  width: " + coord.width + "px;\n  height: " + coord.height + "px;\n  background-position: @icon_" + iconname + "_position;\n}\n");
    }
    fs_1["default"].writeFile('./less/shared/sprites.less', lesstext.join(''), function () {
    });
}
sprite();
