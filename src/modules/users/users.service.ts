import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private usersModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(user: User) {
    const salt = Number(this.configService.get('database.saltOrRounds'));
    const hash = await bcrypt.hash(user.password, salt);
    const createdUser = new this.usersModel({ ...user, password: hash });

    return await createdUser.save();
  }

  getUserWithPassword(email: string) {
    return this.usersModel.findOne({ email }).select('+password').exec();
  }

  getUser(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async subscribeUser(subscriberId, recipientId) {
    const resultSub = await this.usersModel.updateOne(
      { _id: subscriberId },
      {
        $addToSet: {
          subscriptions: new mongoose.Types.ObjectId(recipientId),
        },
      },
    );
    const resultRec = await this.usersModel.updateOne(
      {
        _id: recipientId,
      },
      {
        $addToSet: {
          subscribers: subscriberId,
        },
      },
    );
    if (resultRec.acknowledged && resultSub.acknowledged) return 'Success';
    return 'Failed';
  }

  async getSubscriptions(id: string) {
    const user = await this.usersModel
      .findById(id)
      .populate({ path: 'subscriptions', model: this.usersModel })
      .exec();
    return user.subscriptions || [];
  }

  async getSubscribers(id: string) {
    const user = await this.usersModel
      .findById(id)
      .populate({ path: 'subscribers', model: this.usersModel })
      .exec();
    return user.subscribers;
  }
}
