const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');
const User = require('../../../models/user');

const router = new Router({
  prefix: '/v1/user',
});

router.post('/register', async (ctx) => {
  const val = await new RegisterValidator().validate(ctx); // 由于对email的验证涉及到异步处理，所以需要等待其返回结果

  const user = {
    username: val.get('body.username'),
    email: val.get('body.email'),
    password: val.get('body.password1'),
  };

  const res = await User.create(user);

  throw new global.errors.Success(); // 操作成功，返回成功信息给客户端
});

module.exports = router;
