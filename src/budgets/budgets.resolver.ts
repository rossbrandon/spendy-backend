import {Resolver, Args, Query} from '@nestjs/graphql'
import {Inject} from '@nestjs/common'
import {BudgetsService} from './budgets.service'
import {Budget} from './budget.schema'

@Resolver(() => Budget)
export class BudgetsResolver {
    constructor(
        @Inject(BudgetsService) private budgetsService: BudgetsService,
    ) {}

    @Query(() => [Budget])
    async budgets(): Promise<Budget[]> {
        return await this.budgetsService.findActive()
    }

    @Query(() => Budget)
    async budget(@Args('id') id: string): Promise<Budget> {
        return await this.budgetsService.find(id)
    }
}
