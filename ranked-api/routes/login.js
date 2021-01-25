import Router from '@koa/router';
import { query } from 'faunadb';
import FaunaError from '../errors/fauna';

const { Login, Match, Index } = query;

const router = new Router();

router.post('/', async (ctx) => {
  const { username, password } = ctx.request.body;

  try {
    const db = ctx.app.Db();

    // Authenticate with Fauna
    const result = await db.query(
      Login(
        Match(Index('Users_by_username'), username),
        { password },
      ),
    );

    // If the authentication was successful
    // return the secret to the client
    ctx.body = {
      secret: result.secret,
    };
  } catch (e) {
    throw new FaunaError(e);
  }
});

export default router.routes();
