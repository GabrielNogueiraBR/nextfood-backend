import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FranchiseModule } from './../franchise/franchise.module';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
    ]),
    FranchiseModule,
  ],
  providers: [
    EmployeeService,
  ],
  controllers: [
    EmployeeController,
  ],
  exports: [
    EmployeeService,
  ],
})
export class EmployeeModule {}
