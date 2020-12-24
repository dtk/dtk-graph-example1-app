import express from 'express';
import init from './index';

export default async () => {
  const expressApp = express();

  console.log('Connecting to the database...');
  const redis = await init.db();
  console.log('Starting express app...');

  return await init.app(expressApp, redis);
};
