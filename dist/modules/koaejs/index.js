/*!
 * koa-ejs - index.js
 * Copyright(c) 2017 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */
'use strict';
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
/**
 * Module dependencies.
 */
var debug = require('debug')('koa-ejs');
var fs = require('fs-extra');
var path = require('path');
var ejs = require('ejs');
/**
 * Temp assigned for override later
 */
var parentResolveInclude = ejs.resolveInclude;
/**
 * default render options
 * @type {Object}
 */
var defaultSettings = {
    cache: true,
    layout: 'layout',
    viewExt: 'html',
    locals: {},
    compileDebug: false,
    debug: false,
    writeResp: true
};
var contentPattern = '&&<>&&';
function contentFor(contentName) {
    return contentPattern + contentName + contentPattern;
}
function parseContents(locals) {
    var name, i = 1, str = locals.body, regex = new RegExp('\n?' + contentPattern + '.+?' + contentPattern + '\n?', 'g'), split = str.split(regex), matches = str.match(regex);
    locals.body = split[0];
    if (matches !== null) {
        matches.forEach(function (match) {
            name = match.split(contentPattern)[1];
            locals[name] = split[i];
            i++;
        });
    }
}
/**
 * set app.context.render
 *
 * usage:
 * ```
 * await ctx.render('user', {name: 'dead_horse'});
 * ```
 * @param {Application} app koa application instance
 * @param {Object} settings user settings
 */
function default_1(app, settings) {
    if (app.context.render) {
        return;
    }
    if (!settings || !settings.root) {
        throw new Error('settings.root required');
    }
    settings.root = path.resolve(process.cwd(), settings.root);
    /**
     * cache the generate package
     * @type {Object}
     */
    var cache = Object.create(null);
    settings = Object.assign({}, defaultSettings, settings);
    settings.viewExt = settings.viewExt
        ? '.' + settings.viewExt.replace(/^\./, '')
        : '';
    /**
     * generate html with view name and options
     * @param {String} view
     * @param {Object} options
     * @return {String} html
     */
    function render(view, options) {
        return __awaiter(this, void 0, void 0, function () {
            var viewPath, tpl, fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.info(444 + view);
                        view += settings.viewExt;
                        viewPath = path.join(settings.root, view);
                        debug("render: " + viewPath);
                        // get from cache
                        if (settings.cache && cache[viewPath]) {
                            return [2 /*return*/, cache[viewPath].call(options.scope, options)];
                        }
                        return [4 /*yield*/, fs.readFile(viewPath, 'utf8')];
                    case 1:
                        tpl = _a.sent();
                        // override `ejs` node_module `resolveInclude` function
                        ejs.resolveInclude = function (name, filename, isDir) {
                            if (!path.extname(name)) {
                                name += settings.viewExt;
                            }
                            return parentResolveInclude(name, filename, isDir);
                        };
                        fn = ejs.compile(tpl, {
                            filename: viewPath,
                            _with: settings._with,
                            compileDebug: settings.debug && settings.compileDebug,
                            debug: settings.debug,
                            delimiter: settings.delimiter
                        });
                        if (settings.cache) {
                            cache[viewPath] = fn;
                        }
                        return [2 /*return*/, fn.call(options.scope, options)];
                }
            });
        });
    }
    app.context.render = function (view, _context) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, context, html, layout, writeResp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = this;
                        context = Object.assign({}, ctx.state, _context);
                        context.blockFor = contentFor;
                        return [4 /*yield*/, render(view, context)];
                    case 1:
                        html = _a.sent();
                        layout = context.layout === false ? false : (context.layout || settings.layout);
                        if (!layout) return [3 /*break*/, 3];
                        context.body = html;
                        // context.defineContent = function(contentName: string) { return locals[contentName] || ''; }
                        parseContents(context);
                        context.block = function (blockname, default_txt) {
                            if (context[blockname]) {
                                return context[blockname];
                            }
                            else if (default_txt) {
                                return default_txt;
                            }
                        };
                        return [4 /*yield*/, render(layout, context)];
                    case 2:
                        html = _a.sent();
                        _a.label = 3;
                    case 3:
                        writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);
                        if (writeResp) {
                            // normal operation
                            ctx.type = 'html';
                            ctx.body = html;
                        }
                        else {
                            // only return the html
                            return [2 /*return*/, html];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports["default"] = default_1;
;
