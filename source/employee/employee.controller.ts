import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmployeeCreateDto, EmployeeDeleteByIdDto, EmployeeDto, EmployeeReadByFranchiseDto, EmployeeReadByIdDto, EmployeeUpdateDto } from './employee.dto';
import { EmployeeService } from './employee.service';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {

  public constructor(
    private readonly employeeService: EmployeeService,
  ) { }

  @ApiOperation({ summary: 'Create a employee.' })
  @ApiResponse({ status: 201, type: EmployeeDto })
  @Post()
  public postEmployee(@Body() body: EmployeeCreateDto): Promise<EmployeeDto> {
    return this.employeeService.createEmployee(body);
  }

  @ApiOperation({ summary: 'Read a employee by id.' })
  @ApiResponse({ status: 200, type: EmployeeDto })
  @Get(':id')
  public getEmployeeById(@Param() { id }: EmployeeReadByIdDto): Promise<EmployeeDto> {
    return this.employeeService.readEmployeeById(id);
  }

  @ApiOperation({ summary: 'Read a employee by franchise filter params.' })
  @ApiResponse({ status: 200, type: EmployeeDto, isArray: true })
  @Get()
  public getEmployeeByRestaurant(@Query() query: EmployeeReadByFranchiseDto): Promise<EmployeeDto[]> {
    return this.employeeService.readEmployeeByFranchise(query);
  }

  @ApiOperation({ summary: 'Update a employee by id.' })
  @ApiResponse({ status: 200, type: EmployeeDto })
  @Put(':id')
  public updateEmployeeById(
    @Param() { id }: EmployeeReadByIdDto, @Body() body: EmployeeUpdateDto,
  ): Promise<EmployeeDto> {
    return this.employeeService.updateEmployeeById({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete a employee by id.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteEmployeeById(@Param() { id }: EmployeeDeleteByIdDto): Promise<void> {
    return this.employeeService.deleteEmployeeById(id);
  }

}
