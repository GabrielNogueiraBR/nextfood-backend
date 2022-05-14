import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FranchiseController } from './franchise.controller';
import { Franchise } from './franchise.entity';
import { FranchiseService } from './franchise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Franchise,
    ]),
  ],
  providers: [
    FranchiseService,
  ],
  controllers: [
    FranchiseController,
  ],
})
export class FranchiseModule {}
