import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import md5File from 'md5-file';
import { Model } from 'mongoose';
//
import fakeApiThird from 'src/lib/fake-api.third';
import { UserService } from '../user/user.service';
import { CreateIprDto } from './dto/';
import { IPRStatusEnumObj } from './ipr.enum';
import { IPR } from './ipr.schema';

@Injectable()
export class IprService {
  constructor(
    @InjectModel(IPR.name)
    private IPRModel: Model<IPR>,
    private readonly userService: UserService,
  ) {}

  //

  async create(user, file: Express.Multer.File, createIprData: CreateIprDto) {
    // check if user doesn't have another file on queue already
    const hasPendingRequest = await this.hasPendingRequest(user.id);
    if (hasPendingRequest) return null; // 400 // holdup

    // check if this file has already been given (md5) return from cache
    const md5 = await md5File(file.path);
    const alreadyExistingIPR = await this.IPRModel.findOne({ md5 });
    if (alreadyExistingIPR) {
      // handle duplicate md5
      if (alreadyExistingIPR.status == IPRStatusEnumObj.Fail) {
        // delete failed record, move on...
        await this.IPRModel.deleteOne({ md5 });
      } else {
        // throw duplicate error
        return null;
      }
    }

    // create IPR Record on db
    const newIpr = await this.IPRModel.create({
      location: createIprData.location,
      date: createIprData.date,
      md5,
      inputPath: file.path,
      status: IPRStatusEnumObj.Pending,
      user,
    });

    // handle API followed by socket call
    this.handleFakeAPI(file.path, newIpr.id);

    return newIpr.id;
  }

  //

  async handleFakeAPI(inputPath, IprId) {
    try {
      const outputPath = await fakeApiThird(inputPath);
      await this.IPRModel.updateOne(
        { id: IprId },
        { outputPath, status: IPRStatusEnumObj.Success },
      );
      // TODO: emit a message on sockets
    } catch (err) {
      await this.IPRModel.updateOne(
        { id: IprId },
        {
          status: IPRStatusEnumObj.Fail,
        },
      );
      throw err;
    }
  }

  //

  public async hasPendingRequest(userId: string): Promise<boolean> {
    const pendingIprs = await this.IPRModel.where({
      status: IPRStatusEnumObj.Pending,
    }).populate('user', { id: userId });
    return pendingIprs.length !== 0;
  }

  //

  public async findOne(user, id: string): Promise<any> {
    const ipr = await this.IPRModel.findOne({ id });
    if (!ipr || ipr.user !== user.id) return null; // TODO: Throw 404
    return ipr;
  }
}
