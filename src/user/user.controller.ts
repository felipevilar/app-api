import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Roles } from 'src/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Roles(UserRole.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
