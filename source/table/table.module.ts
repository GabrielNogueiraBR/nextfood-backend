import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FranchiseModule } from './../franchise/franchise.module';
import { TableController } from './table.controller';
import { Table } from './table.entity';
import { TableService } from './table.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Table,
    ]),
    FranchiseModule,
  ],
  providers: [
    TableService,
  ],
  controllers: [
    TableController,
  ],
  exports: [
    TableService,
  ],
})
export class TableModule {}
