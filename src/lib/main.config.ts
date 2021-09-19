import * as dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.HOST,
  port: process.env.PORT,
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
};
