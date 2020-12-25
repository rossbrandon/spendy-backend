import {Resolver, Args, Query, Mutation} from '@nestjs/graphql'
import {Inject} from '@nestjs/common'
import {BudgetsService} from './budgets.service'
import {Budget} from './budget.schema'
import {BudgetDto} from './budget.dto'

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

    @Mutation(() => Budget)
    async createBudget(
        @Args('name') name: string,
        @Args('amount') amount: number,
        @Args('startDate') startDate: Date,
        @Args('endDate', {nullable: true}) endDate: Date,
        @Args('showInMenu') showInMenu: boolean,
    ): Promise<Budget> {
        const budgetDto: BudgetDto = new BudgetDto()
        budgetDto.name = name
        budgetDto.amount = amount
        budgetDto.startDate = startDate
        budgetDto.endDate = endDate
        budgetDto.showInMenu = showInMenu
        return await this.budgetsService.create(budgetDto)
    }

    @Mutation(() => Budget)
    async updateBudget(
        @Args('id') id: string,
        @Args('name') name: string,
        @Args('amount') amount: number,
        @Args('startDate') startDate: Date,
        @Args('endDate', {nullable: true}) endDate: Date,
        @Args('showInMenu') showInMenu: boolean,
    ): Promise<Budget> {
        const budgetDto: BudgetDto = new BudgetDto()
        budgetDto.name = name
        budgetDto.amount = amount
        budgetDto.startDate = startDate
        budgetDto.endDate = endDate
        budgetDto.showInMenu = showInMenu
        return await this.budgetsService.update(id, budgetDto)
    }

    @Mutation(() => Budget)
    async deleteBudget(@Args('id') id: string): Promise<Budget> {
        return await this.budgetsService.delete(id)
    }
}
