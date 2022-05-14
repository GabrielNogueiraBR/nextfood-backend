import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

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
