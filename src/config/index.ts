import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const NODE_ENV = process.env.NODE_ENV
  ? String(process.env.NODE_ENV)
  : 'localhost';

export const DB_CONNECT = process.env.DB_CONNECTION
  ? String(process.env.DB_CONNECTION)
  : '';

export const SERVER = {
  PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
  HOSTNAME: process.env.SERVER_HOSTNAME
    ? String(process.env.SERVER_HOSTNAME)
    : '',
};
