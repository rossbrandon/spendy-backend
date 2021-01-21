import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AggregatesService } from './aggregates.service'
import { Aggregate } from './aggregate.schema'
import { AuthGuard } from '@nestjs/passport'

@Controller('v1/aggregates')
export class AggregatesController {
    constructor(private readonly aggregatesService: AggregatesService) {}

    @Get('budget')
    @UseGuards(AuthGuard('jwt'))
    async aggregate(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<Aggregate[]> {
        return await this.aggregatesService.aggregateBudgets(startDate, endDate)
    }
}
