import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongo: {
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
    database: process.env.qudradev,
    username: process.env.MONGO_ROOT_USER,
    password: process.env.MONGO_ROOT_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    expire: process.env.REDIS_EXPIRE,
    password: process.env.REDIS_PASSWORD,
  },
};
