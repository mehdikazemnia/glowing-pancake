import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIprDto {
  @ApiProperty({
    description: 'User`s username.',
    example: 'johndoe',
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

  @ApiProperty({
    description: 'Repeat the password.',
    default: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly passwordConfirm: string;
}
