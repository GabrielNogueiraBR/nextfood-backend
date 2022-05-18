import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto, UserDeleteByIdDto, UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  /**
   * Create a user.
   * @param userDto
   */
  public async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const { name, email } = userDto;

    let userEntity = this.repository.create({
      name,
      email,
    });
    userEntity = await this.repository.save(userEntity);

    return new UserDto(userEntity);
  }

  /**
   * Read user by id.
   * @param id
   */
  public async readUserById(id: string): Promise<UserDto> {
    const userEntity = await this.repository.findOneBy({ id });

    if (!userEntity) throw new BadRequestException('User not found!');

    return new UserDto(userEntity);
  }

  /**
   * Update user name or description by id.
   * @param params
   */
  public async updateUserById(params: UpdateUserDto): Promise<UserDto> {
    const { id, ...rest } = params;

    const userEntity = await this.readUserById(id);
    const userUpdated = await this.repository.save({
      ...userEntity,
      ...rest,
    });

    return new UserDto(userUpdated);
  }

  /**
   * Delete user by id.
   * @param params
   */
  public async deleteUserById(params: UserDeleteByIdDto): Promise<void> {
    const { id } = params;

    await this.readUserById(id);
    await this.repository.delete(id);

    return;
  }

}
