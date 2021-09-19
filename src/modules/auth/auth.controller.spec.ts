import { Test } from '@nestjs/testing';
// import { Connection } from 'mongoose';`
import { AppModule } from '../../app.module';
import request from 'supertest';
import { registerRQ, loginRQ } from './auth.rq-rs';

describe('UsersController', () => {
  // let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  const userData = {
    username: 'u' + (2048 + Math.round(Math.random() * 2048)),
    password: '123123',
    passwordConfirm: '123123',
  };

  // beforeEach(async () => {
  //   await dbConnection.collection('users').deleteMany({});
  // });

  describe('register', () => {
    it('should make a new user', async () => {
      const registerRequest: registerRQ = userData;
      const response = await request(httpServer)
        .post('/auth/register')
        .send(registerRequest);

      expect(response.body).toHaveProperty('token');
      expect(response.status).toBe(201);
    });
  });

  describe('login', () => {
    it('should login the user', async () => {
      const registerRequest: loginRQ = {
        username: userData.username,
        password: userData.password,
      };
      const response = await request(httpServer)
        .post('/auth/login')
        .send(registerRequest);

      expect(response.body).toHaveProperty('token');
      expect(response.status).toBe(201);
    });
  });

  // ...
});
