import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { Address } from './address.entity';

export class AddressDto {

  @IsUUID()
  public id: string;

  @IsString()
  public country: string;

  @IsString()
  public state: string;

  @IsString()
  public city: string;

  @IsString()
  public borough: string;

  @IsString()
  public street: string;

  @IsString() @IsOptional()
  public complement?: string;

  @IsNumber() @IsOptional()
  public number?: number;

  public constructor({ id, country, state, city, borough, street, complement, number }: Address) {
    this.id = id;
    this.country = country;
    this.state = state;
    this.city = city;
    this.borough = borough;
    this.street = street;
    this.complement = complement;
    this.number = number;
  }

}

export class AddressDataCreateDto {

  @IsString()
  public country: string;

  @IsString()
  public state: string;

  @IsString()
  public city: string;

  @IsString()
  public borough: string;

  @IsString()
  public street: string;

  @IsString() @IsOptional()
  public complement?: string;

  @IsNumber() @IsOptional()
  public number?: number;

}

export class AddressCreateDto extends AddressDataCreateDto {

  @IsUUID()
  public restaurantId: string;

}
