"use strict";
/**
 * 注册路由
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
function default_1(app) {
    var rlist = glob_1["default"].sync('*', {
        cwd: path_1["default"].join(__dirname, '../../routes/')
    });
    rlist.forEach(function (v) {
        var router = require(path_1["default"].join(__dirname, '../../routes/') + v);
        app.use(router.routes()).use(router.allowedMethods());
    });
}
exports["default"] = default_1;
