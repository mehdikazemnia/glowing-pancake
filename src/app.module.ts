import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
//
import mainConfig from './lib/main.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { IprModule } from './modules/ipr/ipr.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'media', 'output'),
    }),
    MongooseModule.forRoot(
      `mongodb://${mainConfig.mongo.host}/${mainConfig.mongo.database}`,
      {
        authSource: 'admin',
        auth: {
          username: mainConfig.mongo.username,
          password: mainConfig.mongo.password,
        },
        autoIndex: true, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
      },
    ),
    UserModule,
    AuthModule,
    IprModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
