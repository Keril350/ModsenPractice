import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, passwd: string): Promise<User> {
    const user = this.usersRepository.create({ username, passwd });
    return this.usersRepository.save(user);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
