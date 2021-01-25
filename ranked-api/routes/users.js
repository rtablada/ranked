import Router from '@koa/router';
import { query } from 'faunadb';
import FaunaError from '../errors/fauna';

const { Collection, Create } = query;

const router = new Router();

router.post('/', async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const db = ctx.app.Db();

    const q = Create(Collection('Users'), {
      data: { username },
      credentials: { password },
    });

    const result = await db.query(q);

    ctx.body = result;
  } catch (e) {
    throw new FaunaError(e);
  }
});

export default router.routes();
