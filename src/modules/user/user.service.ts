import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//
import { User } from './user.schema';
import { IUserCreate } from './user.interface';
import { IPRStatusEnumObj } from '../ipr/ipr.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  public async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id });
    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  public async createUser(createUser: IUserCreate): Promise<User> {
    const user = await this.userModel.create(createUser);
    return user;
  }

  public async hasPendingRequest(userId: string): Promise<boolean> {
    const pendingIpr = await this.userModel
      .findById(userId)
      .populate('ipr')
      .where({ status: IPRStatusEnumObj.Pending });
    console.log(pendingIpr);
    return !!pendingIpr;
  }
}
