import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, TableCheck } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private ripo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.ripo.create({ email, password });
    return this.ripo.save(user);
  }

  async findOne(id: number): Promise<User> {
    if (!id) null;
    const user = await this.ripo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async getByEmail(email: string) {
    const user = await this.ripo.find({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  findAll() {
    return this.ripo.find();
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attributes);
    return this.ripo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.ripo.remove(user);
  }
}
