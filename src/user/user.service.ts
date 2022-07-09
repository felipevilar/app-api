import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { AddressService } from 'src/address/address.service';
import { QueryParamsDto } from 'src/api/dto/params.dto';
import { IApiResponse } from 'src/api/interfaces/api.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './model/model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly addressService: AddressService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const address = await this.addressService.create(user.address);
    const userPayload = {
      ...user,
      address: address._id,
    };
    const createdUser = new this.userModel(userPayload);
    const result = await createdUser.save();
    const populate = await result.populate('address');
    return populate;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');
    const user = await this.userModel.findById(id);
    return user;
  }

  async findAll(paramsDto: QueryParamsDto): Promise<IApiResponse<User>> {
    const { max = 10, page = 1, sort, where } = paramsDto;
    const parsedWhere = where ? JSON.parse(where) : {};
    const parsedSort = sort ? JSON.parse(sort) : { _created: -1 };
    const count = await this.userModel.countDocuments(parsedWhere).exec();
    const pageNumber = page > 0 ? page : 1;
    const users = await this.userModel
      .find(parsedWhere)
      .select({ password: 0 })
      .sort(parsedSort)
      .limit(max)
      .skip((pageNumber - 1) * max)
      .populate('address')
      .exec();

    const apiResponse: IApiResponse<User> = {
      _items: users,
      _meta: {
        max_results: max,
        total_results: count,
        page: pageNumber,
        total_pages: Math.ceil(count / max),
      },
    };

    return apiResponse;
  }
}
