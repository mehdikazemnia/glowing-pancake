import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
//
import { IPRStatusEnumObj } from '../ipr.enum';

export class ReadIprDto {
  @ApiProperty({
    description: 'Identifier of the "Image processing request"',
  })
  @IsNotEmpty()
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Not empty if status is success.',
  })
  @IsNotEmpty()
  @Expose()
  public downloadUrl: string;

  @ApiProperty({})
  @IsNotEmpty()
  @Expose()
  public location: string;

  @ApiProperty({})
  @IsNotEmpty()
  @Expose()
  public date: string;

  @ApiProperty({
    description: 'Identifier of the "Image processing request"',
    enum: IPRStatusEnumObj,
  })
  @IsNotEmpty()
  @Expose()
  public status: string;

  constructor(id, downloadUrl, location, date, status) {
    this.id = id;
    this.downloadUrl = downloadUrl;
    this.location = location;
    this.date = date;
    this.status = status;
  }
}
