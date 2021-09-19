import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
//
import { UserService } from '../user/user.service';
import mainConfig from '../../lib/main.config';
import { loginRQ, loginRS, registerRQ, registerRS } from './auth.rq-rs';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /* -------------------------------------------------- */
  /*                         API                        */
  /* -------------------------------------------------- */

  async register(registerUserData: registerRQ): Promise<registerRS> {
    const existingUser = await this.userService.findByUsername(
      registerUserData.username,
    );
    if (existingUser) throw new BadRequestException('Duplicate credentials.');

    const salt = await bcrypt.genSalt(3);
    const password = await bcrypt.hash(registerUserData.password, salt);
    const { username } = registerUserData;
    const newUser = await this.userService.createUser({
      password,
      salt,
      username,
    });
    const userId = String(newUser.id);

    const accessToken = await this.createUserAccessToken(userId);

    return new tokenDto(accessToken);
  }

  async login(loginUserData: loginRQ): Promise<loginRS> {
    const user = await this.validateUserPassword(loginUserData);
    if (!user) throw new UnauthorizedException('Incorrect credentials.');

    const userId = String(user.id);
    const accessToken = await this.createUserAccessToken(userId);

    return new tokenDto(accessToken);
  }

  /* -------------------------------------------------- */
  /*                        FUNCS                       */
  /* -------------------------------------------------- */

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

  private async validateUserPassword(loginUserData: loginRQ) {
    const { username, password } = loginUserData;
    const user = await this.userService.findByUsername(username);
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
