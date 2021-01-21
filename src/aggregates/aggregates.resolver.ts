import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { AggregatesService } from './aggregates.service'
import { Aggregate, AggregateDocument } from './aggregate.schema'
import { Budget } from '../budgets/budget.schema'
import { GqlAuthGuard } from '../authz/gqlauth.guard'

@Resolver(() => Aggregate)
export class AggregatesResolver {
    constructor(
        @Inject(AggregatesService) private aggregatesService: AggregatesService,
    ) {}

    @ResolveField(() => Budget)
    @UseGuards(GqlAuthGuard)
    async budget(
        @Parent() aggregate: AggregateDocument,
        @Args('populate') populate: boolean,
    ) {
        if (populate) {
            await aggregate.populate('budget').execPopulate()
        }

        return aggregate.budget
    }

    @Query(() => [Aggregate])
    @UseGuards(GqlAuthGuard)
    async aggregateBudgets(
        @Args('startDate') startDate: Date,
        @Args('endDate') endDate: Date,
    ): Promise<Aggregate[]> {
        return await this.aggregatesService.aggregateBudgets(startDate, endDate)
    }
}
