import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmployeeCreateDto, EmployeeDeleteByIdDto, EmployeeDto, EmployeeIdDto, EmployeeReadByFranchiseDto, EmployeeReadByIdDto, EmployeeUpdateDto } from './employee.dto';
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
  @ApiResponse({ status: 200, type: [ EmployeeDto ] })
  @Get()
  public getEmployeeByRestaurant(@Query() params: EmployeeReadByFranchiseDto): Promise<EmployeeDto[]> {
    return this.employeeService.readEmployeeByFranchise(params);
  }

  @ApiOperation({ summary: 'Update a employee by id.' })
  @ApiResponse({ status: 200, type: EmployeeDto })
  @Put(':id')
  public updateEmployeeById(
    @Param() { id }: EmployeeReadByIdDto, @Body() body: EmployeeUpdateDto,
  ): Promise<EmployeeDto> {
    return this.employeeService.updateEmployeeById({ id, ...body });
  }

  @ApiOperation({ summary: 'Update a employee status to activate.' })
  @ApiResponse({ status: 200 })
  @Put(':id/status/activate')
  public updateEmployeeStatusActivateById(@Param() { id }: EmployeeIdDto): Promise<void> {
    return this.employeeService.updateEmployeeStatusById({ id, value: true });
  }

  @ApiOperation({ summary: 'Update a employee status to deactivate.' })
  @ApiResponse({ status: 200 })
  @Put(':id/status/deactivate')
  public updateEmployeeStatusDeactivateById(@Param() { id }: EmployeeIdDto): Promise<void> {
    return this.employeeService.updateEmployeeStatusById({ id, value: false });
  }

  @ApiOperation({ summary: 'Delete a employee by id.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteEmployeeById(@Param() { id }: EmployeeDeleteByIdDto): Promise<void> {
    return this.employeeService.deleteEmployeeById(id);
  }

}
