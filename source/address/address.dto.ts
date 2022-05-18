import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { Address } from './address.entity';

export class AddressIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class AddressIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class AddressDto extends AddressIdDto {

  @ApiProperty({ type: 'string' })
  @IsString()
  public country: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public state: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public city: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public borough: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public street: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsOptional()
  public complement?: string;

  @ApiProperty({ type: 'number' })
  @IsNumber() @IsOptional()
  public streetNumber?: number;

  public constructor({ id, country, state, city, borough, street, complement, streetNumber }: Address) {
    super();
    this.id = id;
    this.country = country;
    this.state = state;
    this.city = city;
    this.borough = borough;
    this.street = street;
    this.complement = complement;
    this.streetNumber = streetNumber;
  }

}

export class AddressDataCreateDto {

  @ApiProperty({ type: 'string' })
  @IsString()
  public country: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public state: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public city: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public borough: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public street: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString() @IsOptional()
  public complement?: string;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber() @IsOptional()
  public streetNumber?: number;

}

export class AddressCreateDto extends AddressDataCreateDto {

  @IsUUID()
  public restaurantId: string;

}
