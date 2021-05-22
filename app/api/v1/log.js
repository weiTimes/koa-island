const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/log',
});

router.post('/', async (ctx) => {
  console.log(ctx.request.body, '接收到传递过来的参数');

  ctx.body = {
    message: '上报成功',
  };
});

module.exports = router;
