import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FranchiseCreateDto, FranchiseDeleteByIdDto, FranchiseDto, FranchiseIdDto, FranchiseReadByIdDto, FranchiseReadByRestaurantDto, FranchiseUpdateDto } from './franchise.dto/franchise.dto';
import { FranchiseProductCreateDto, FranchiseProductDeleteByIdDto, FranchiseProductDto, FranchiseProductReadByIdDto, FranchiseProductReadDto, FranchiseProductUpdateDto } from './franchise.dto/franchise.product.dto';
import { FranchiseScheduleCreateDto, FranchiseScheduleDeleteDto, FranchiseScheduleDto, FranchiseScheduleUpdateDto } from './franchise.dto/franchise.schedule.dto';
import { FranchiseProductService } from './franchise.service/franchise.product.service';
import { FranchiseScheduleService } from './franchise.service/franchise.schedule.service';
import { FranchiseService } from './franchise.service/franchise.service';

@ApiTags('Franchise')
@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
    private readonly franchiseSchedule: FranchiseScheduleService,
    private readonly franchiseProductService: FranchiseProductService,
  ) { }

  @ApiOperation({ summary: 'Create a franchise.' })
  @ApiResponse({ status: 201, type: FranchiseDto })
  @Post()
  public postFranchise(@Body() body: FranchiseCreateDto): Promise<FranchiseDto> {
    return this.franchiseService.createFranchise(body);
  }

  @ApiOperation({ summary: 'Read a franchise by id.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Get(':id')
  public getFranchiseById(@Param() { id }: FranchiseReadByIdDto): Promise<FranchiseDto> {
    return this.franchiseService.readFranchiseById(id);
  }

  @ApiOperation({ summary: 'Read a franchise by restaurant filter params.' })
  @ApiResponse({ status: 200, type: FranchiseDto, isArray: true })
  @Get()
  public getFranchiseByRestaurant(@Query() params: FranchiseReadByRestaurantDto): Promise<FranchiseDto[]> {
    return this.franchiseService.readFranchiseByRestaurant(params);
  }

  @ApiOperation({ summary: 'Update a franchise by id.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Put(':id')
  public updateFranchiseById(@Param() { id }: FranchiseIdDto, @Body() body: FranchiseUpdateDto): Promise<FranchiseDto> {
    return this.franchiseService.updateFranchiseById({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete a franchise by id.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteFranchiseById(@Param() { id }: FranchiseDeleteByIdDto): Promise<void> {
    return this.franchiseService.deleteFranchiseById(id);
  }

  @ApiOperation({ summary: 'Create a franchise schedule.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Post(':id/schedule')
  public postFranchiseSchedule(
    @Param() { id }: FranchiseIdDto, @Body() body: FranchiseScheduleCreateDto,
  ): Promise<FranchiseScheduleDto> {
    return this.franchiseSchedule.createFranchiseSchedule({ franchiseId: id, ...body });
  }

  @ApiOperation({ summary: 'Update a franchise schedule.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Put(':id/schedule')
  public updateFranchiseSchedule(
    @Param() { id: franchiseId }: FranchiseIdDto, @Body() body: FranchiseScheduleUpdateDto,
  ): Promise<FranchiseScheduleDto> {
    return this.franchiseSchedule.updateFranchiseSchedule({ franchiseId, ...body });
  }

  @ApiOperation({ summary: 'Delete a franchise schedule.' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/schedule')
  public deleteFranchiseSchedule(
    @Param() { id }: FranchiseIdDto, @Query() query: FranchiseScheduleDeleteDto,
  ): Promise<void> {
    return this.franchiseSchedule.deleteFranchiseSchedule({ franchiseId: id, ...query });
  }

  @Post('product')
  public postFranchiseProduct(@Body() body: FranchiseProductCreateDto): Promise<FranchiseProductDto> {
    return this.franchiseProductService.createFranchiseProduct(body);
  }

  @Get('product')
  public getFranchiseProduct(@Query() query: FranchiseProductReadDto): Promise<FranchiseProductDto[]> {
    return this.franchiseProductService.readFranchiseProduct(query);
  }

  @Put('/product/:id')
  public updateFranchiseProductById(
    @Param() { id }: FranchiseProductReadByIdDto, @Body() body: FranchiseProductUpdateDto,
  ): Promise<FranchiseProductDto> {
    return this.franchiseProductService.updateFranchiseProductById({ id, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProductById(@Param() { id }: FranchiseProductDeleteByIdDto): Promise<void> {
    return this.franchiseProductService.deleteFranchiseProductById(id);
  }

}
