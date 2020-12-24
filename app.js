require('dotenv').config();
// import dotenv from 'dotenv';
import init from './src/init';
// dotenv.config();

async function start() {
  await init.start();
}

start();
