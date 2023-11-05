import {
  ExecutionContext,
  CallHandler,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInteceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
