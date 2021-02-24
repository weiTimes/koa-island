const Router = require('koa-router');
const sequelize = require('sequelize');

const {
  TokenValidator,
  NotEmptyValidator,
} = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const User = require('../../../models/user');
const { generateToken } = require('../../../core/utils');
const AuthToken = require('../../../middlewares/auth-token');
const WxManager = require('../../services/wx');

const router = new Router({
  prefix: '/v1/token',
});

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx);
  let token = '';

  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WxManager.codeToToken(v.get('body.account'));
      break;
    default:
      throw new global.errors.ParameterException('没有相应的处理函数');
  }

  ctx.body = {
    token,
  };
});

// 验证 token
router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx);

  const result = AuthToken.verifyToken(v.get('body.token'));

  ctx.body = {
    result,
  };
});

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);

  // email 登陆的是普通用户
  return generateToken(user.id, AuthToken.USER);
}

module.exports = router;
