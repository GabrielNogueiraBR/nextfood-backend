/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public email: string;

}
export class UpdateUserDto {

  @IsOptional() @IsUUID()
  public id?: string;

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public email: string;

}

export class UserReadByIdDto {

  @IsString() @IsUUID()
    id: string;

}
export class UserDeleteByIdDto {

  @IsString() @IsUUID()
  public id: string;

}

