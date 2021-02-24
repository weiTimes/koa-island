/*
 * @Author: yewei
 * @Date: 2021-02-22 22:14:31
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-24 22:06:41
 *
 * 用于验证 token
 */
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class AuthToken {
  /**
   *
   * @param {*} routeLevel 路由权限级别
   */
  constructor(level = 1) {
    this.level = level;
    // 通过数字定义角色的权限
    AuthToken.USER = 8;
    AuthToken.ADMIN = 16;
    AuthToken.SUPER_ADMIN = 32;
  }

  get m() {
    return async (ctx, next) => {
      // 检测token
      const userToken = basicAuth(ctx.req); // ctx.req 是node.js原生的对象; ctx.request 是 koa 的对象
      let errMsg = 'token不合法';
      let decode;

      if (!userToken || !userToken.name) {
        throw new global.errors.Forbbiden(errMsg);
      }

      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (error) {
        // 1. token 不合法 2. token 已过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期';
        }

        throw new global.errors.Forbbiden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足';
        throw new global.errors.Forbbiden(errMsg);
      }

      // 将用户数据保存在上下文中
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };

      await next();
    };
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = AuthToken;
