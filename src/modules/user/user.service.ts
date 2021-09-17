import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { IUserCreate } from './user.interface';

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

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  public async createUser(createUser: IUserCreate): Promise<User> {
    const user = await this.userModel.create(createUser);
    return user;
  }
}
