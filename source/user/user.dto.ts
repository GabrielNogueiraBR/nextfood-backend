/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public email: string;

}
export class UpdateUserDto {

  @IsOptional() @IsNumberString()
  public id?: string;

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public email: string;

}

export class UserReadByIdDto {

  @IsString()
    id: string;

}
export class UserDeleteByIdDto {

  @IsString()
  public id: string;

}

