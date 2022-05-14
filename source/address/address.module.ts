import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
    ]),
  ],
  providers: [
    AddressService,
  ],
  controllers: [ ],
  exports: [
    AddressService,
  ],
})
export class AddressModule {}
