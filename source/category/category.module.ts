import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
    ]),
  ],
  providers: [
    CategoryService,
  ],
  controllers: [
    CategoryController,
  ],
  exports: [
    CategoryService,
  ],
})
export class CategoryModule {}
