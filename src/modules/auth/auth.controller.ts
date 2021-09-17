import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto } from '../user/dto';
import { User } from '../user/user.schema';
import { AuthService } from './auth.service';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //

  @Post('login')
  async login(@Body() loginUserData: LoginUserDto) {
    const token = await this.authService.login(loginUserData);
    return { token };
  }

  //

  @Post('register')
  public async register(@Body() registerUserData: RegisterUserDto) {
    const token = await this.authService.register(registerUserData);
    return { token };
  }
}
