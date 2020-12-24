// import Sequelize from 'sequelize';
import redis from 'redis';

export default async () => {
  const {
    DB_HOST,
    DB_PORT,
    DB_PASSWORD
  } = process.env;
  const client = redis.createClient({
      host: DB_HOST,
      port: DB_PORT,
      password: DB_PASSWORD
  });

  client.on('error', err => {
      console.log('Error ' + err);
  });
  
  return client;
};
