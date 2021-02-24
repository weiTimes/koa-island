const Router = require('koa-router');
const { PositiveIntegerValidator } = require('../../validators/validator');
const AuthToken = require('../../../middlewares/auth-token');

const router = new Router({
  prefix: '/v1/classic',
});

// /v1/classic/:id
router.get('/latest', new AuthToken(9).m, async (ctx, next) => {
  // const params = ctx.params;
  // const query = ctx.request.query;
  // const body = ctx.request.body;
  // const header = ctx.request.header;
  // const validate = await new PositiveIntegerValidator().validate(ctx);
  // const id = validate.get('path.id');

  ctx.body = ctx.auth.uid;
});

module.exports = router;
