import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QueryParamsDto } from 'src/api/dto/params.dto';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tickets')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  async create(@Body() createCallDto: CreateCallDto) {
    const createdCall = await this.callsService.create(createCallDto);
    return createdCall;
  }

  @Get()
  async find(@Query() paramsDto: QueryParamsDto) {
    try {
      const calls = await this.callsService.findAll(paramsDto);
      return calls;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
    return this.callsService.update(+id, updateCallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callsService.remove(+id);
  }
}
