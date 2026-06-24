import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AdminCompaniesController, CompaniesController } from './companies.controller';

@Module({
  controllers: [AdminCompaniesController, CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
