import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../modules/user/user.service';
import mainConfig from '../../lib/main.config';
@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'userJwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: mainConfig.jwt.secret,
    });
  }

  async validate(payload) {
    const userId = payload.userId;
    let user;
    if (userId) user = await this.userService.findById(userId);
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
