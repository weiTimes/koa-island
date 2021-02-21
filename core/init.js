/*
 * @Author: yewei
 * @Date: 2021-02-15 15:06:34
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-21 21:16:40
 *
 * 初始化应用
 */
const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadConfig();
    InitManager.initLoadRouters();
    InitManager.loadHttpExceptions();
  }

  static initLoadConfig(path = '') {
    global.config = require(path || `${process.cwd()}/config`);
  }

  static initLoadRouters() {
    const path = `${process.cwd()}/app/api`;

    requireDirectory(module, path, {
      visit: (module) => {
        if (module instanceof Router) {
          InitManager.app.use(module.routes()).use(module.allowedMethods());
        }
      },
    });
  }

  static loadHttpExceptions() {
    const errors = require('./http-exception');

    global.errors = errors;
  }
}

module.exports = InitManager;
