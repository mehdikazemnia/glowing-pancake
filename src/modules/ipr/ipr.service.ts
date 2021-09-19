import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import md5File from 'md5-file';
import { Model } from 'mongoose';
//
import fakeApiThird from '../../lib/fake-api.third';
import mainConfig from '../../lib/main.config';
import { ReadIprDto } from './dto';
import { IPRStatusEnumObj } from './ipr.enum';
import { createRQ, createRS, readRS } from './ipr.rq-rs';
import { IPR } from './ipr.schema';

@Injectable()
export class IprService {
  constructor(
    @InjectModel(IPR.name)
    private IPRModel: Model<IPR>,
  ) {}

  /* -------------------------------------------------- */
  /*                         API                        */
  /* -------------------------------------------------- */

  //

  async create(
    user,
    file: Express.Multer.File,
    createIprData: createRQ,
  ): Promise<createRS> {
    // check if user doesn't have another file on queue already
    const firstPendingRequest = await this.getFirstPendingRequest(user.id);
    if (firstPendingRequest)
      throw new HttpException(
        `You have a pending request by Id of ${firstPendingRequest.id}`,
        400,
      );

    // check if this file has already been given (md5) return from cache
    const md5 = await md5File(file.path);
    const alreadyExistingIPR = await this.IPRModel.findOne({
      $or: [
        { md5 },
        {
          location: createIprData.location,
          date: new Date(createIprData.date),
        },
      ],
    });
    if (alreadyExistingIPR) {
      // handle duplicate md5
      if (alreadyExistingIPR.status == IPRStatusEnumObj.Fail) {
        // delete failed record, move on...
        await this.IPRModel.deleteOne({ md5 });
      } else {
        throw new HttpException(
          `You have already submitted and image like this #${alreadyExistingIPR.id}, (either duplicate location/date combination or you're using the same file)`,
          409,
        );
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

    return new ReadIprDto(
      newIpr.id,
      '',
      newIpr.location,
      newIpr.date,
      newIpr.status,
    );
  }

  //

  public async read(user, id: string): Promise<readRS> {
    const ipr = await this.IPRModel.findOne({ id });
    if (!ipr || ipr.user !== user.id)
      throw new HttpException(`IPR not found`, 404);
    const { location, date, outputPath, status } = ipr;
    let downloadUrl = '';
    if (status == IPRStatusEnumObj.Success) {
      downloadUrl = `http://${mainConfig.host}:${
        mainConfig.port
      }/${outputPath.replace('media/output/', '')}`;
    }
    return new ReadIprDto(id, downloadUrl, location, date, status);
  }

  /* -------------------------------------------------- */
  /*                        FUNCS                       */
  /* -------------------------------------------------- */

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

  public async getFirstPendingRequest(userId: string): Promise<any> {
    const pendingIprs = await this.IPRModel.where({
      status: IPRStatusEnumObj.Pending,
    }).populate('user', { id: userId });
    return pendingIprs[0];
  }
}
