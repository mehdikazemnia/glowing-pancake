import * as dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.HOST,
  port: process.env.PORT,
  socket: {
    appId: process.env.SOCKET_APPID,
    key: process.env.SOCKET_KEY,
    secret: process.env.SOCKET_SECRET,
    host: process.env.SOCKET_HOST,
    port: process.env.SOCKET_PORT,
    masterKey: process.env.SOCKET_ENCRYPTION_MASTER_KEY,
  },
  mongo: {
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE,
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
