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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('ipr')
@ApiBearerAuth('JWT-auth')
@UseGuards(UserJwtAuthGuard)
@ApiTags('Image Processing Request')
// @UseGuards(UserJwtAuthGuard)
export class IprController {
  constructor(private readonly iprService: IprService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createIprData: CreateIprDto,
  ) {
    const user = request.user;
    return this.iprService.create(user, file, createIprData);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: string) {
    const user = request.user;
    return this.iprService.findOne(user, +id);
  }
}
