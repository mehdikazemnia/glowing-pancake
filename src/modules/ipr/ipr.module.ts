import { Module } from '@nestjs/common';
//
import { IprService } from './ipr.service';
import { IprController } from './ipr.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      dest: './media/input',
    }),
  ],
  controllers: [IprController],
  providers: [IprService, UserService],
})
export class IprModule {}
