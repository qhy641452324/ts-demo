"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var minimist_1 = __importDefault(require("minimist"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_config = require("../webpack.config");
var compiler = webpack_1["default"](webpack_config);
var argv = minimist_1["default"](process.argv.slice(2));
if (argv.w) {
    console.info('webpack开始监听');
    var watching = compiler.watch({}, function (err, stats) {
        if (err) {
            console.error(err);
        }
        else {
            var result_json = stats.toJson({
                assets: true,
                hash: false,
                modules: false,
                chunks: false
            });
            //console.info(result_json);
            if (result_json.errors.length > 0) {
                result_json.errors.forEach(function (v) {
                    console.error('ERROR in ' + v);
                });
            }
            else {
                console.info('[' + (new Date()).toLocaleTimeString() + '] webpack编译成功' + ' 耗时:' + result_json.time + 'ms');
            }
        }
    });
}
else {
    compiler.run(function (err, stats) {
        if (err) {
            console.error(err);
        }
        else {
            var result_json = stats.toJson({
                assets: true,
                hash: false,
                modules: false,
                chunks: false
            });
            //console.info(result_json);
            if (result_json.errors.length > 0) {
                result_json.errors.forEach(function (v) {
                    console.error('ERROR in ' + v);
                });
            }
            else {
                console.info('[' + (new Date()).toLocaleTimeString() + '] webpack编译成功' + ' 耗时:' + result_json.time + 'ms');
            }
        }
    });
}
