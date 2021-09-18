import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Express } from 'express';
import * as md5File from 'md5-file';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
//
import { CreateIprDto, UpdateIprDto } from './dto/';
import { IPR } from './ipr.schema';

@Injectable()
export class IprService {
  constructor(
    @InjectModel(IPR.name)
    private IPRModel: Model<IPR>,
    private readonly userService: UserService,
  ) {}

  async create(user, file: Express.Multer.File, createIprDto: CreateIprDto) {
    // check if user doesn't have another file on queue already
    const hasPendingRequest = await this.userService.hasPendingRequest(user.id);
    if (hasPendingRequest) return null;

    // check if this file has already been given (md5) return from cache
    const md5 = await md5File(file.path);
    const alreadyExistingIPR = await this.IPRModel.findOne({ md5 });
    if (alreadyExistingIPR) return null;

    // call the fake API and return the iprId
    console.log(hasPendingRequest, md5);

    return md5;
  }

  findOne(user, id: number) {
    console.log(user, id);
    return `This action returns a #${id} ipr`;
  }

  update(id: number, updateIprDto: UpdateIprDto) {
    return `This action updates a #${id} ipr`;
  }
}
