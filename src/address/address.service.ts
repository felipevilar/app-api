import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDto } from './dto/address.dto';
import { Address } from './model/address.model';

@Injectable()
export class AddressService {
  constructor(@InjectModel('Address') private readonly addressModel: Model<Address>) {}
  create(createAddressDto: AddressDto) {
    const address = new this.addressModel(createAddressDto);
    return address.save();
  }
}
