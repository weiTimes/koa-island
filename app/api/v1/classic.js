const Router = require('koa-router');
const { PositiveIntegerValidator } = require('../../validators/validator');

const router = new Router();

router.post('/v1/classic/:id', async (ctx, next) => {
  // const params = ctx.params;
  // const query = ctx.request.query;
  // const body = ctx.request.body;
  // const header = ctx.request.header;

  const validate = await new PositiveIntegerValidator().validate(ctx);
  const id = validate.get('path.id');
});

module.exports = router;
