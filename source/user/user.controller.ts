/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, UserDeleteByIdDto, UserReadByIdDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public postUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getUserById(@Param() { id }: UserReadByIdDto): Promise<User> {
    return this.userService.readUserbyId(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateUser(@Param() params: UserReadByIdDto, @Body() body: UpdateUserDto): Promise <User> {
    return this.userService.updateUserById({ ...params, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUserById(@Param() params: UserDeleteByIdDto): Promise <void> {
    return this.userService.deleteUserById(params);
  }

}
