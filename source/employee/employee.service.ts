import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FranchiseService } from '../franchise/franchise.service/franchise.service';
import { EmployeeCreateDto, EmployeeDto, EmployeeReadByFranchiseDto, EmployeeUpdateDto } from './employee.dto';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {

  public constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
    private readonly franchiseService: FranchiseService,
  ) { }

  /**
   * Create a employee.
   * @param employeeDto
   */
  public async createEmployee(employeeDto: EmployeeCreateDto): Promise<EmployeeDto> {
    const { franchiseId, name, hiredDate } = employeeDto;

    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);
    let employeeEntity = this.repository.create({
      name,
      hiredDate,
      franchise: franchiseEntity,
    });
    employeeEntity = await this.repository.save(employeeEntity);

    return new EmployeeDto(employeeEntity);
  }

  /**
   * Read a employee by id.
   * @param id
   */
  public async readEmployeeById(id: string): Promise<EmployeeDto> {
    const employeeEntity = await this.repository.findOneBy({ id });

    return new EmployeeDto(employeeEntity);
  }

  /**
   * Read employee by franchise filter params.
   * @param params
   */
  public async readEmployeeByFranchise(params: EmployeeReadByFranchiseDto): Promise<EmployeeDto[]> {
    const { franchiseId, isActive } = params;

    const franchiseEntities = await this.repository.find({
      where: {
        franchise: {
          id: franchiseId,
          isActive: isActive,
        },
      },
    });

    return franchiseEntities.map((franchise) => new EmployeeDto(franchise));
  }

  /**
   * Update a employee by id.
   * @param params
   */
  public async updateEmployeeById(params: EmployeeUpdateDto): Promise<EmployeeDto> {
    const { id, ...rest } = params;

    const employeeEntity = await this.repository.findOneBy({ id });

    if (!employeeEntity) throw new NotFoundException('Restaurant not found!');

    const employeeUpdated = await this.repository.save({
      ...employeeEntity,
      ...rest,
    });

    return new EmployeeDto(employeeUpdated);
  }

  /**
   * Delete a employee by id.
   * @param id
   */
  public async deleteEmployeeById(id: string): Promise<void> {
    await this.readEmployeeById(id);
    await this.repository.delete(id);

    return;
  }

}
