import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsLatLong } from 'class-validator';
//
import { ReadIprDto } from './dto';

export class createRQ {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'Date in which the image has been captured.',
    default: '2018-03-20T09:12:28Z',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @ApiProperty({
    description: 'lat, long (GPS).',
    default: '41.40338, 2.17403',
  })
  @IsNotEmpty()
  @IsLatLong()
  readonly location: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly file: string;
}

export class createRS extends ReadIprDto {}

export class readRS extends ReadIprDto {}
