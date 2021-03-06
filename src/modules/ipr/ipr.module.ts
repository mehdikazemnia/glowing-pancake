import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
//
import { IprService } from './ipr.service';
import { IprController } from './ipr.controller';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { IPRSchema, IPR } from './ipr.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: IPR.name, schema: IPRSchema }]),
    MulterModule.register({
      dest: './media/input',
    }),
  ],
  controllers: [IprController],
  providers: [IprService, UserService],
})
export class IprModule {}
