import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { tokenDto } from './dto';
//

export class loginRQ {
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

export class registerRQ {
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

export class loginRS extends tokenDto {}
export class registerRS extends tokenDto {}
