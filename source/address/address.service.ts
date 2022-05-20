import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressDataCreateDto, AddressDto } from './address.dto';
import { Address } from './address.entity';

@Injectable()
export class AddressService {

  public constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>,
  ) { }

  /**
   * Create a address.
   * @param addressDto
   */
  public async createAddress(addressDto: AddressDataCreateDto): Promise<AddressDto> {
    let addressEntity = this.repository.create(addressDto);
    addressEntity = await this.repository.save(addressEntity);

    return new AddressDto(addressEntity);
  }

}
