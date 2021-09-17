import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Base extends mongoose.Document {
  @Prop({ default: mongoose.Types.ObjectId })
  public _id: string;

  @Prop({ required: false, index: true, default: () => Date.now() })
  public createdAt!: Date;

  @Prop({ required: false, default: () => Date.now() })
  public updatedAt!: Date;

  @Prop({ required: false, default: () => null })
  public deletedAt?: Date;
}
