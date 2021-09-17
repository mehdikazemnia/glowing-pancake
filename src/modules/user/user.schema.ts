import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Base } from 'src/lib/base.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends Base {
  @Prop({ unique: true, required: true })
  public email: string;

  @Prop({ required: true })
  public username: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
