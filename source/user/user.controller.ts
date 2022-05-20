import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto, UserDeleteByIdDto, UserDto, UserReadByIdDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: 'Create a user.' })
  @ApiResponse({ status: 201, type: UserDto })
  @Post()
  public postUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }

  @ApiOperation({ summary: 'Read a user by Id.' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get(':id')
  public getUserById(@Param() { id }: UserReadByIdDto): Promise<UserDto> {
    return this.userService.readUserById(id);
  }

  @ApiOperation({ summary: 'Update a user.' })
  @ApiResponse({ status: 200, type: UserDto })
  @Put(':id')
  public updateUser(@Param() params: UserReadByIdDto, @Body() body: UpdateUserDto): Promise <UserDto> {
    return this.userService.updateUserById({ ...params, ...body });
  }

  @ApiOperation({ summary: 'Delete a user.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUserById(@Param() params: UserDeleteByIdDto): Promise <void> {
    return this.userService.deleteUserById(params);
  }

}
