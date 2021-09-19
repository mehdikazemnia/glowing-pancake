import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class tokenDto {
  @ApiProperty({
    description: 'Access Token',
  })
  @IsNotEmpty()
  @Expose()
  public token: string;

  constructor(token) {
    this.token = token;
  }
}
