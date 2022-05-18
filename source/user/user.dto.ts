/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { User } from './user.entity';

export class UserIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class UserIdOptionalDto {

  @IsUUID() @IsOptional()
  public id?: string;

}

export class UserDto extends UserIdDto {

  @ApiProperty({ type: 'string' })
  @IsString()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public email: string;

  public constructor({ id, name, email }: User) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }

}

export class CreateUserDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public email: string;

}
export class UpdateUserDto extends UserIdOptionalDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public email?: string;

}

export class UserReadByIdDto extends UserIdDto { }
export class UserDeleteByIdDto extends UserIdDto { }

