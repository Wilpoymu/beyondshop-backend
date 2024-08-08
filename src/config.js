import 'dotenv/config';

export default {
  SECRET: process.env.SECRET,
};

export const port =
  process.env.NODE_ENV === 'dev' ? process.env.DEV_PORT : process.env.PORT;

export const dbURL = process.env.DATABASE_URL;
