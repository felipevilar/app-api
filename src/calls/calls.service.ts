import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { AddressService } from 'src/address/address.service';
import { QueryParamsDto } from 'src/api/dto/params.dto';
import { IApiResponse } from 'src/api/interfaces/api.interfaces';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Call } from './model/call.model';

@UseGuards(AuthGuard('jwt'))
@Injectable()
export class CallsService {
  constructor(
    @InjectModel('Call') private readonly callModel: Model<Call>,
    private readonly addressService: AddressService,
  ) {}

  async create(createCallDto: CreateCallDto) {
    const address = await this.addressService.create(createCallDto.address);
    const clientPayload = {
      ...createCallDto,
      address: address._id,
    };
    const createdCall = await this.callModel.create(clientPayload);
    const populate = await createdCall.populate('address');
    return populate;
  }

  async findAll(paramsDto: QueryParamsDto): Promise<IApiResponse<Call>> {
    const { max = 10, page = 1, sort, where } = paramsDto;
    const parsedWhere = where ? JSON.parse(where) : {};
    const parsedSort = sort ? JSON.parse(sort) : { _created: -1 };
    const count = await this.callModel.countDocuments(parsedWhere).exec();
    const pageNumber = page > 0 ? page : 1;
    const calls = await this.callModel
      .find(parsedWhere)
      .sort(parsedSort)
      .limit(max)
      .skip((pageNumber - 1) * max)
      .populate({
        path: 'client_id',
        populate: {
          path: 'address',
        },
      })
      .populate({
        path: 'technician_id',
        populate: {
          path: 'address',
        },
      })
      .populate({
        path: 'responsible_id',
        populate: {
          path: 'address',
        },
      })
      .populate('address')
      .exec();

    const apiResponse: IApiResponse<Call> = {
      _items: calls,
      _meta: {
        max_results: max,
        total_results: count,
        page: pageNumber,
        total_pages: Math.ceil(count / max),
      },
    };

    return apiResponse;
  }

  findOne(id: number) {
    return this.callModel.findById(id);
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return this.callModel.findByIdAndUpdate(id, updateCallDto);
  }

  remove(id: number) {
    return this.callModel.findByIdAndRemove(id);
  }
}
