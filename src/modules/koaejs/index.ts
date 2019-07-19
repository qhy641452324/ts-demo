/*!
 * koa-ejs - index.js
 * Copyright(c) 2017 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



'use strict';

/**
 * Module dependencies.
 */

const debug = require('debug')('koa-ejs');
const fs = require('fs-extra')
const path = require('path');
const ejs = require('ejs');

/**
 * Temp assigned for override later
 */
const parentResolveInclude = ejs.resolveInclude;

/**
 * default render options
 * @type {Object}
 */
const defaultSettings = {
  cache: true,
  layout: 'layout',
  viewExt: 'html',
  locals: {},
  compileDebug: false,
  debug: false,
  writeResp: true
};



var contentPattern = '&&<>&&';

function contentFor(contentName: string) {
  return contentPattern + contentName + contentPattern;
}


function parseContents(locals: { [x: string]: any; body: any; }) {
  var name, i = 1, str = locals.body,
    regex = new RegExp('\n?' + contentPattern + '.+?' + contentPattern + '\n?', 'g'),
    split = str.split(regex),
    matches = str.match(regex);

  locals.body = split[0];

  if (matches !== null) {
    matches.forEach(function (match: { split: (arg0: string) => any[]; }) {
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
export default function (app: any, settings: any) {
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
  const cache = Object.create(null);

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
  async function render(view: string, options: any) {
    //console.info(444 + view);
    view += settings.viewExt;
    const viewPath = path.join(settings.root, view);
    debug(`render: ${viewPath}`);
    // get from cache
    if (settings.cache && cache[viewPath]) {
      return cache[viewPath].call(options.scope, options);
    }

    const tpl = await fs.readFile(viewPath, 'utf8');

    // override `ejs` node_module `resolveInclude` function
    ejs.resolveInclude = function(name: string, filename: any, isDir: any) {
      if (!path.extname(name)) {
        name += settings.viewExt;
      }
      return parentResolveInclude(name, filename, isDir);
    }

    const fn = ejs.compile(tpl, {
      filename: viewPath,
      _with: settings._with,
      compileDebug: settings.debug && settings.compileDebug,
      debug: settings.debug,
      delimiter: settings.delimiter
    });
    if (settings.cache) {
      cache[viewPath] = fn;
    }

    return fn.call(options.scope, options);
  }

  app.context.render = async function (view: string, _context: any) {
    const ctx:any = this;
    const context = Object.assign({}, ctx.state, _context);
    context.blockFor = contentFor;

    let html = await render(view, context);

    const layout = context.layout === false ? false : (context.layout || settings.layout);
    if (layout) {
      context.body = html
      // context.defineContent = function(contentName: string) { return locals[contentName] || ''; }
      parseContents(context);
      context.block = function(blockname: string, default_txt: any){
        if (context[blockname]) {
          return context[blockname]
        }
        else if (default_txt) {
          return default_txt
        }
      }
      html = await render(layout, context);
    }
    // if (layout) {
    //   // if using layout
    //   context.body = html;
      
    //   html = await render2(layout, context);
    // }
    
    const writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);
    if (writeResp) {
      // normal operation
      ctx.type = 'html';
      ctx.body = html;
    } else {
      // only return the html
      return html;
    }
  };
};

/**
 * Expose ejs
 */

//exports.ejs = ejs;