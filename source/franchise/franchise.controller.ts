import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { FranchiseCreateDto, FranchiseDto, FranchiseReadById } from './franchise.dto/franchise.dto';
import { FranchiseService } from './franchise.service';

@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
  ) { }

  @Post()
  public postFranchise(@Body() body: FranchiseCreateDto): Promise<FranchiseDto> {
    return this.franchiseService.createFranchise(body);
  }

  @Get(':id')
  public getFranchiseById(@Param() { id }: FranchiseReadById): Promise<FranchiseDto> {
    return this.franchiseService.readFranchiseById(id);
  }

}
