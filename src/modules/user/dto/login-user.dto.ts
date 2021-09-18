import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    default: 'johndoe',
    description: 'The username of the User.',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'The password of the User.',
    default: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
