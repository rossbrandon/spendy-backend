import {Resolver, Args, Query, ResolveField, Parent} from '@nestjs/graphql'
import {Inject} from '@nestjs/common'
import {ExpensesService} from './expenses.service'
import {Expense, ExpenseDocument} from './expense.schema'
import {Budget} from '../budgets/budget.schema'

@Resolver(() => Expense)
export class ExpensesResolver {
    constructor(
        @Inject(ExpensesService) private expensesService: ExpensesService,
    ) {}

    @Query(() => [Expense])
    async expenses(): Promise<Expense[]> {
        return await this.expensesService.findAll()
    }

    @Query(() => [Expense])
    async expensesByDateRange(
        @Args('startDate') startDate: Date,
        @Args('endDate') endDate: Date,
    ): Promise<Expense[]> {
        return await this.expensesService.findByDateRange(startDate, endDate)
    }

    @Query(() => Expense)
    async expense(@Args('id') id: string): Promise<Expense> {
        return await this.expensesService.find(id)
    }

    @ResolveField(() => Budget)
    async budget(
        @Parent() expense: ExpenseDocument,
        @Args('populate') populate: boolean,
    ) {
        if (populate) {
            await expense.populate('budget').execPopulate()
        }

        return expense.budget
    }
}
