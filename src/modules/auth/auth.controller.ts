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
  async login(@Body() loginUserData: LoginUserDto): Promise<any> {
    const res = await this.authService.login(loginUserData);
    return res;
  }

  //

  @Post('register')
  public async register(
    @Body() registerUserData: RegisterUserDto,
  ): Promise<User> {
    const res = await this.authService.register(registerUserData);
    return res;
  }
}
