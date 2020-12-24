import { Router } from 'express';
import redis from './redis';

export default app => {
  const router = Router();

  router.use('/redis', redis(app));

  return router;
};
