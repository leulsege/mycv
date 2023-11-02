import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (user.length) {
      throw new BadRequestException('the user is already exist');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = hash.toString('hex') + '.' + salt;

    return this.userService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('the user is not found');
    }
    const [storedHash, salt] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('incorrect password');
    }

    return user;
  }
}
