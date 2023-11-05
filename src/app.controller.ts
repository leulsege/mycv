import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUserInteceptor } from './interceptors/current-user.interceptor';

@Controller()
// @UseInterceptors(CurrentUserInteceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
