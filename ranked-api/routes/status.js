import Router from '@koa/router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'ok (ish)',
    key: process.env.FAUNA_KEY
  };
});

export default router.routes();
