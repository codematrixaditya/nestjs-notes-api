import { Injectable } from '@nestjs/common';
import { LoggerService } from '../utils/logger/logger.service';
import { RegisterUserDto } from '../utils/dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    this.logger.log('Creating a new user with:', registerUserDto);

    return await this.userModel.create(registerUserDto);
  }
}
