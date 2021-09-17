import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
//
import mainConfig from '../../lib/main.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserJwtStrategy } from './strategies/jwt.strategy';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: ['userJwt'] }),
    JwtModule.register({
      secret: mainConfig.jwt.secret,
      signOptions: { expiresIn: mainConfig.jwt.expiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, UserService],
  exports: [AuthService, UserJwtStrategy],
})
export class AuthModule {}
