import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, passwd: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(passwd, user.passwd)) {
      const { passwd, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, passwd: string) {
    const hashedPassword = await bcrypt.hash(passwd, 10);
    return this.usersService.create(username, hashedPassword);
  }
}
