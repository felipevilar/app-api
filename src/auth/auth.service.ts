import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const findUser = await this.userService.findByEmail(email);
    if (findUser && bcrypt.compareSync(password, findUser.password)) {
      const user = {
        _id: findUser._id,
        email: findUser.email,
        roles: findUser.roles,
      };
      return user;
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
