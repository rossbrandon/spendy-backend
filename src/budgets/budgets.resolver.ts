import {
    Resolver,
    Args,
    Query,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { BudgetsService } from './budgets.service'
import { Budget, BudgetDocument } from './budget.schema'
import { BudgetDto } from './budget.dto'
import { Expense } from 'src/expenses/expense.schema'
import { ExpensesService } from 'src/expenses/expenses.service'
import { Permissions } from '../authz/permissions.decorator'
import { GqlPermissionsGuard } from '../authz/gqlpermissions.guard'
import { GqlAuthGuard } from '../authz/gqlauth.guard'

@Resolver(() => Budget)
export class BudgetsResolver {
    constructor(
        @Inject(BudgetsService) private budgetsService: BudgetsService,
        @Inject(ExpensesService) private expensesService: ExpensesService,
    ) {}

    @ResolveField(() => [Expense])
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('read:budgets')
    async expenses(
        @Parent() budget: BudgetDocument,
        @Args('startDate') startDate: Date,
        @Args('endDate') endDate: Date,
    ) {
        const { id } = budget
        return this.expensesService.findByBudget(id, startDate, endDate)
    }

    @Query(() => [Budget])
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('read:budgets')
    async budgets(): Promise<Budget[]> {
        return await this.budgetsService.findActive()
    }

    @Query(() => Budget)
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('read:budgets')
    async budget(@Args('id') id: string): Promise<Budget> {
        return await this.budgetsService.find(id)
    }

    @Mutation(() => Budget)
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('create:budgets')
    async createBudget(
        @Args('name') name: string,
        @Args('amount') amount: number,
        @Args('startDate') startDate: Date,
        @Args('endDate', { nullable: true }) endDate: Date,
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
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('update:budgets')
    async updateBudget(
        @Args('id') id: string,
        @Args('name') name: string,
        @Args('amount') amount: number,
        @Args('startDate') startDate: Date,
        @Args('endDate', { nullable: true }) endDate: Date,
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
    @UseGuards(GqlAuthGuard, GqlPermissionsGuard)
    @Permissions('delete:budgets')
    async deleteBudget(@Args('id') id: string): Promise<Budget> {
        return await this.budgetsService.delete(id)
    }
}
