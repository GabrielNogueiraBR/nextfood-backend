import { Body, Controller, Post } from '@nestjs/common';

import { FranchiseCreateDto, FranchiseDto } from './franchise.dto/franchise.dto';
import { FranchiseService } from './franchise.service';

@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
  ) { }

  @Post()
  public postRestaurant(@Body() body: FranchiseCreateDto): Promise<FranchiseDto> {
    return this.franchiseService.createFranchise(body);
  }

}
