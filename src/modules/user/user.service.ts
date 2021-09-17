import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RegisterUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  public async findAndValidateById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id });
    return user;
  }

  public async findByValidationInput(validationInput: string): Promise<User> {
    let key;
    if (validationInput.match(/[+0]{1}[\d]{10,12}/)) key = 'mobile';
    if (validationInput.match(/[\d\w]+\@[\d\w]+\.[\w]{2,5}/)) key = 'email';
    if (validationInput.match(/[\d\w]+/)) key = 'username';
    const user = await this.userModel.findOne({ [key]: validationInput });
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  public async createUser(registerData: RegisterUserDto): Promise<User> {
    const user = await this.userModel.create(registerData);
    return user;
  }

  async getUserProfile(id) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
