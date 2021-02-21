/*
 * @Author: yewei
 * @Date: 2021-02-14 20:57:47
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-19 22:44:23
 *
 * 入口文件
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

const app = new Koa();

app.use(catchError);
app.use(bodyParser());

// 初始化管理器
InitManager.initCore(app);

// 注册中间件
app.use(async (ctx, next) => {
  console.log('say hello.');
  await next();
});

const PORT = 3006;
app.listen(PORT, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
