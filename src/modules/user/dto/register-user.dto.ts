import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User`s private email address.',
    example: 'example@sample.com',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    required: true,
    example: 'johndoe',
  })
  readonly username: string;

  @ApiProperty({
    description: 'The password of the User.',
    default: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat the password.',
    default: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly passwordConfirm: string;
}
