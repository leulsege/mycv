import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private ripo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.ripo.create(reportDto);
    report.user = user;
    return this.ripo.save(report);
  }
}
