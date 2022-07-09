import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressService } from 'src/address/address.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './model/client.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
    private readonly addressService: AddressService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const address = await this.addressService.create(createClientDto.address);
    const clientPayload = {
      ...createClientDto,
      address: address._id,
    };
    return (await this.clientModel.create(clientPayload)).populate('address');
  }

  findAll() {
    return this.clientModel.find().populate('address');
  }

  findOne(id: number) {
    return this.clientModel.findById(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientModel.findByIdAndRemove(id);
  }
}
