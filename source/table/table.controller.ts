import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TableCreateDto, TableDeleteByIdDto, TableDto, TableReadByFranchiseDto, TableReadByIdDto, TableUpdateDto } from './table.dto';
import { TableService } from './table.service';

@ApiTags('Table')
@Controller('table')
export class TableController {

  public constructor(
    private readonly tableService: TableService,
  ) { }

  @ApiOperation({ summary: 'Create a table.' })
  @ApiResponse({ status: 201, type: TableDto })
  @Post()
  public postTable(@Body() body: TableCreateDto): Promise<TableDto> {
    return this.tableService.createTable(body);
  }

  @ApiOperation({ summary: 'Read a table by id.' })
  @ApiResponse({ status: 200, type: TableDto })
  @Get(':id')
  public getTableById(@Param() { id }: TableReadByIdDto): Promise<TableDto> {
    return this.tableService.readTableById(id);
  }

  @ApiOperation({ summary: 'Read a table by franchise filter params.' })
  @ApiResponse({ status: 200, type: [ TableDto ] })
  @Get()
  public getTableByFranchise(@Query() query: TableReadByFranchiseDto): Promise<TableDto[]> {
    return this.tableService.readTableByFranchise(query);
  }

  @ApiOperation({ summary: 'Update a table by id.' })
  @ApiResponse({ status: 200, type: TableDto })
  @Put(':id')
  public updateTableById(
    @Param() { id }: TableReadByIdDto, @Body() body: TableUpdateDto,
  ): Promise<TableDto> {
    return this.tableService.updateTableById({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete a table by id.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTableById(@Param() { id }: TableDeleteByIdDto): Promise<void> {
    return this.tableService.deleteTableById(id);
  }

}
