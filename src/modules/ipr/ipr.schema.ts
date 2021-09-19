import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
//
import { Base } from '../../lib/base.entity';
import {
  IPRStatusEnumObj,
  IPRStatusEnumValues,
  IPRStatusEnum,
} from './ipr.enum';
import { User } from '../user/user.schema';

export type IPRDocument = IPR & mongoose.Document;

@Schema()
export class IPR extends Base {
  @Prop({ unique: true, required: true })
  public md5: string;

  @Prop({ unique: true, required: true })
  public inputPath: string;

  @Prop({ required: false })
  public outputPath: string;

  @Prop({ enum: IPRStatusEnumValues, default: IPRStatusEnumObj.Pending })
  public status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  public user: User;

  @Prop({ required: true })
  public date: Date;

  @Prop({ required: true })
  public location: string;
}

export const IPRSchema = SchemaFactory.createForClass(IPR);
