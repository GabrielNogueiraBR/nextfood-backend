import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FranchiseService } from './../franchise/franchise.service';
import { TableCreateDto, TableDto, TableReadByFranchiseDto, TableUpdateDto } from './table.dto';
import { Table } from './table.entity';

@Injectable()
export class TableService {

  public constructor(
    @InjectRepository(Table)
    private readonly repository: Repository<Table>,
    private readonly franchiseService: FranchiseService,
  ) { }

  /**
   * Create a table.
   * @param tableDto
   */
  public async createTable(tableDto: TableCreateDto): Promise<TableDto> {
    const { franchiseId, name, quantity } = tableDto;

    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);
    let tableEntity = this.repository.create({
      name,
      quantity,
      franchise: franchiseEntity,
    });
    tableEntity = await this.repository.save(tableEntity);

    return new TableDto(tableEntity);
  }

  /**
   * Read a table by id.
   * @param id
   */
  public async readTableById(id: string): Promise<TableDto> {
    const tableEntity = await this.repository.findOneBy({ id });

    return new TableDto(tableEntity);
  }

  /**
   * Read table by franchise filter params.
   * @param params
   */
  public async readTableByFranchise(params: TableReadByFranchiseDto): Promise<TableDto[]> {
    const { franchiseId, isActive, isEmpty } = params;

    const tableEntities = await this.repository.find({
      where: {
        franchise: {
          id: franchiseId,
        },
        isActive: isActive,
        isEmpty: isEmpty,
      },
    });

    return tableEntities.map((franchise) => new TableDto(franchise));
  }

  /**
   * Update a table by id.
   * @param params
   */
  public async updateTableById(params: TableUpdateDto): Promise<TableDto> {
    const { id, ...rest } = params;

    const tableEntity = await this.repository.findOneBy({ id });

    if (!tableEntity) throw new NotFoundException('Entity not found!');

    const employeeUpdated = await this.repository.save({
      ...tableEntity,
      ...rest,
    });

    return new TableDto(employeeUpdated);
  }

  /**
   * Delete a table by id.
   * @param id
   */
  public async deleteTableById(id: string): Promise<void> {
    await this.readTableById(id);
    await this.repository.delete(id);

    return;
  }

}
