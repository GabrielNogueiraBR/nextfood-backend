import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '../category/category.module';
import { FranchiseProductModule } from '../franchise_product/franchise-product.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ]),
    RestaurantModule,
    CategoryModule,
    FranchiseProductModule,
  ],
  providers: [
    ProductService,
  ],
  controllers: [
    ProductController,
  ],
  exports: [
    ProductService,
  ],
})
export class ProductModule {}
