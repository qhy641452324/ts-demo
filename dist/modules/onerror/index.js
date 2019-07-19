"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
function default_1() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, is_show_message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        if (!(ctx.url.indexOf('/api/') == 0)) return [3 /*break*/, 3];
                        is_show_message = false //是否是需要暴露给前端的错误状态
                        ;
                        if (err_1.message.indexOf('showerror') == 0) {
                            is_show_message = true;
                        }
                        ctx.status = 200;
                        if (process.env.NODE_ENV !== "production") {
                            if (is_show_message) {
                                err_1.message = err_1.message.substring(9);
                            }
                            ctx.body = {
                                re: false,
                                message: err_1.message,
                                result: err_1.stack
                            };
                        }
                        else {
                            if (is_show_message) {
                                ctx.body = {
                                    re: false,
                                    message: err_1.message.substring(9)
                                };
                            }
                            else {
                                ctx.body = {
                                    re: false,
                                    message: 'system error'
                                };
                            }
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(process.env.NODE_ENV !== "production")) return [3 /*break*/, 4];
                        ctx.body = "<textarea style=\"width: 800px; height: 400px; margin:0 auto;display:block;font-family: consolas; font-size:14px; line-height:175%; overflow:auto; border:0;background-color:#f3f3f3; padding:20px;\">ERROR\n" + err_1.stack + "</textarea>";
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, ctx.render('shared/error', {
                            title: '500',
                            layout: false
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
}
exports["default"] = default_1;
