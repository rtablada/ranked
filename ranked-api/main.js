import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import faunaDb from 'faunadb';

import router from './routes/index';

import config from './config';

const app = new Koa();

app.Db = () => new faunaDb.Client({
  secret: process.env.FAUNA_KEY,
});

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, () => {
    console.log(`Started Server on Port ${config.port}`);
  });
