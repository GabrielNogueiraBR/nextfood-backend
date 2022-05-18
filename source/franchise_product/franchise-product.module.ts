import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FranchiseModule } from '../franchise/franchise.module';
import { ProductModule } from '../product/product.module';
import { FranchiseProductController } from './franchise-product.controller';
import { FranchiseProduct } from './franchise-product.entity';
import { FranchiseProductService } from './franchise-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FranchiseProduct,
    ]),
    ProductModule,
    FranchiseModule,
  ],
  providers: [
    FranchiseProductService,
  ],
  controllers: [
    FranchiseProductController,
  ],
  exports: [
    FranchiseProductService,
  ],
})
export class FranchiseProductModule {}
