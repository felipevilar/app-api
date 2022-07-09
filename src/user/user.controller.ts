import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { QueryParamsDto } from 'src/api/dto/params.dto';
import { Public } from 'src/public.decorator';
import { Roles } from 'src/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './model/model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
  @Get()
  async find(@Query() paramsDto: QueryParamsDto) {
    try {
      const users = await this.userService.findAll(paramsDto);
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles(UserRole.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
