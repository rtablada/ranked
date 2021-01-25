import Router from '@koa/router';

import status from './status';
import users from './users';
import login from './login';

const router = new Router();

router.use('/', status);
router.use('/users', users);
router.use('/login', login);

export default router;
