import { Router } from 'express';
import getRedis from './redis.get';
import postRedis from './redis.post';

export default app => {
  const router = Router();

  router.get('/', getRedis(app));
  router.post('/', postRedis(app));

  return router;
};
