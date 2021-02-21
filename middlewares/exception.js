/*
 * @Author: yewei
 * @Date: 2021-02-15 17:02:13
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-19 22:10:54
 *
 * 全局异常处理中间件
 */
const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isDev = global.config.env === 'dev';
    const isNotHttpException = error instanceof HttpException;

    if (isDev && !isNotHttpException) {
      throw error;
    }

    if (error instanceof HttpException) {
      // 已知错误
      ctx.body = {
        message: error.message,
        error_code: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.status;
    } else {
      // 未知错误
      ctx.body = {
        message: '未知错误',
        error_code: 999,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.staus = 500;
    }
  }
};

module.exports = catchError;
