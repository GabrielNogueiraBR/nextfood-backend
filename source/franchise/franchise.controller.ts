import { Body, Controller, Post } from '@nestjs/common';

import { FranchiseCreateDto } from './franchise.dto';
import { Franchise } from './franchise.entity';
import { FranchiseService } from './franchise.service';

@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
  ) { }

  @Post()
  public postRestaurant(@Body() body: FranchiseCreateDto): Promise<Franchise> {
    return this.franchiseService.createFranchise(body);
  }

}
