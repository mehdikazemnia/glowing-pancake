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
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
//
import { IprService } from './ipr.service';
import { UserJwtAuthGuard } from '../auth/user.jwt-auth.guard';
import { Express } from 'express';
import * as iprRQRS from './ipr.rq-rs';

@Controller('ipr')
@ApiBearerAuth('JWT-auth')
@UseGuards(UserJwtAuthGuard)
@ApiTags('Image Processing Request')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  //

  @Post('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: iprRQRS.createRS,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createIprData: iprRQRS.createRQ,
  ): Promise<iprRQRS.createRS> {
    const user = request.user;
    return this.iprService.create(user, file, createIprData);
  }

  //

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: iprRQRS.readRS,
  })
  public async read(@Req() request, @Param('id') id: string) {
    const user = request.user;
    const ipr = await this.iprService.read(user, id);
    return ipr;
  }
}
