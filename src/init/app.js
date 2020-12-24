import middlewares from './middlewares';
import routes from './routes';

async function startExpressApp({ expressApp, models }) {
  const server = expressApp.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  return server;
}

export default async (expressApp, redis) => {
  const app = {
    expressApp,
    redis,
  };

  console.log('Initiating middlewares...');
  await middlewares(app);
  console.log('Initiating routes...');
  await routes(app);
  app.server = await startExpressApp(app);

  return app;
};
