import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//
import { AuthService } from './auth.service';
import * as authRQRS from './auth.rq-rs';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //

  @ApiResponse({
    status: HttpStatus.OK,
    type: authRQRS.loginRS,
  })
  @Post('login')
  async login(@Body() loginData: authRQRS.loginRQ): Promise<authRQRS.loginRS> {
    const result = await this.authService.login(loginData);
    return result;
  }

  //

  @ApiResponse({
    status: HttpStatus.OK,
    type: authRQRS.registerRS,
  })
  @Post('register')
  public async register(
    @Body() registerData: authRQRS.registerRQ,
  ): Promise<authRQRS.registerRS> {
    const result = await this.authService.register(registerData);
    return result;
  }
}
