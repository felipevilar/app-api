import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
