import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    default: '09121234567',
    description: 'The email || mobile || username of the User.',
    uniqueItems: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly validationInput: string;

  @ApiProperty({
    description: 'The password of the User',
    default: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
