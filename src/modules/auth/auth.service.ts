import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { RegisterUserDto, LoginUserDto } from '../user/dto';
import * as bcrypt from 'bcrypt';
import mainConfig from '../../lib/main.config';

@Injectable()
export class AuthService {
  // private readonly logger = new LoggerService('AuthService');
  constructor(private readonly userService: UserService) {}

  public jwtExtractor(request: Request) {
    let token = null;
    if (request.headers.authorization) {
      token = request.headers.authorization
        .replace('Bearer', '')
        .replace(/\s/g, '');
    }
    if (token) {
    } else {
      throw new BadRequestException('No token Provided.');
    }
    return token;
  }

  async register(registerUserData: RegisterUserDto): Promise<any> {
    const existingUser = await this.userService.findByEmail(
      registerUserData.email,
    );
    if (existingUser) throw new BadRequestException('Duplicate credentials.');

    const salt = await bcrypt.genSalt(3);
    const password = await bcrypt.hash(registerUserData.password, salt);
    const { email } = registerUserData;
    const newUser = await this.userService.createUser({
      password,
      salt,
      email,
    });
    const userId = String(newUser._id);

    const accessToken = await this.createUserAccessToken(userId);

    return accessToken;
  }

  async login(loginUserData: LoginUserDto): Promise<any> {
    const user = await this.validateUserPassword(loginUserData);
    if (!user) throw new UnauthorizedException('Incorrect credentials.');

    const userId = String(user._id);
    const accessToken = await this.createUserAccessToken(userId);

    return accessToken;
  }

  private async validateUserPassword(loginUserData: LoginUserDto) {
    const { email, password } = loginUserData;
    const user = await this.userService.findByEmail(email);
    if (user) {
      const hash = await bcrypt.hash(password, user.salt);
      const passwordIsValid = hash === user.password;
      if (passwordIsValid) {
        return user;
      }
    } else {
      return null;
    }
  }

  createUserAccessToken(userId: string) {
    const accessToken = sign({ userId }, mainConfig.jwt.secret, {
      expiresIn: mainConfig.jwt.expiration,
    });
    return accessToken;
  }
}
