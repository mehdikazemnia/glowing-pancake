import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IprService } from './ipr.service';
import { CreateIprDto } from './dto/';
import { UserJwtAuthGuard } from '../auth/guards/user.jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { IPRStatusEnumObj } from './ipr.enum';
import mainConfig from 'src/lib/main.config';

@Controller('ipr')
@ApiBearerAuth('JWT-auth')
@UseGuards(UserJwtAuthGuard)
@ApiTags('Image Processing Request')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  //

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createIprData: CreateIprDto,
  ) {
    const user = request.user;
    return this.iprService.create(user, file, createIprData);
  }

  //

  @Get(':id')
  public async findOne(@Req() request, @Param('id') id: string) {
    const user = request.user;
    const ipr = await this.iprService.findOne(user, id);
    const { location, date, outputPath, status, _id } = ipr;
    let message = '';
    if (status == IPRStatusEnumObj.Success) {
      message = `download your file from http://${mainConfig.host}:${
        mainConfig.port
      }/${outputPath.replace('media/output/', '')}`;
    }
    return {
      message,
      data: {
        location,
        date,
        status,
        _id,
      },
    };
  }
}
