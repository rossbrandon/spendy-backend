import {
    Resolver,
    Args,
    Query,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { ExpensesService } from './expenses.service'
import { Expense, ExpenseDocument, Aggregate } from './expense.schema'
import { Budget } from '../budgets/budget.schema'
import { ExpenseDto } from './expense.dto'
import { GqlAuthGuard } from '../authz/gqlauth.guard'

@Resolver(() => Expense)
export class ExpensesResolver {
    constructor(
        @Inject(ExpensesService) private expensesService: ExpensesService,
    ) {}

    @ResolveField(() => Budget)
    @UseGuards(GqlAuthGuard)
    async budget(
        @Parent() expense: ExpenseDocument,
        @Args('populate') populate: boolean,
    ) {
        if (populate) {
            await expense.populate('budget').execPopulate()
        }

        return expense.budget
    }

    @Query(() => [Expense])
    @UseGuards(GqlAuthGuard)
    async expenses(): Promise<Expense[]> {
        return await this.expensesService.findAll()
    }

    @Query(() => [Expense])
    @UseGuards(GqlAuthGuard)
    async expensesByDateRange(
        @Args('startDate') startDate: Date,
        @Args('endDate') endDate: Date,
    ): Promise<Expense[]> {
        return await this.expensesService.findByDateRange(startDate, endDate)
    }

    @Query(() => Expense)
    @UseGuards(GqlAuthGuard)
    async expense(@Args('id') id: string): Promise<Expense> {
        return await this.expensesService.find(id)
    }

    @Query(() => [Aggregate])
    @UseGuards(GqlAuthGuard)
    async aggregate(
        @Args('startDate') startDate: Date,
        @Args('endDate') endDate: Date,
    ): Promise<Aggregate[]> {
        return await this.expensesService.aggregateSum(startDate, endDate)
    }

    @Mutation(() => Expense)
    @UseGuards(GqlAuthGuard)
    async createExpense(
        @Args('place') place: string,
        @Args('price') price: number,
        @Args('date') date: Date,
        @Args('reason') reason: string,
        @Args('recurring') recurring: boolean,
        @Args('recurUntil', { nullable: true }) recurUntil: Date,
        @Args('budget') budget: string,
    ): Promise<Expense> {
        const expenseDto: ExpenseDto = new ExpenseDto()
        expenseDto.place = place
        expenseDto.price = price
        expenseDto.date = date
        expenseDto.reason = reason
        expenseDto.recurring = recurring
        expenseDto.recurUntil = recurUntil
        expenseDto.budget = budget
        return await this.expensesService.create(expenseDto)
    }

    @Mutation(() => Expense)
    @UseGuards(GqlAuthGuard)
    async updateExpense(
        @Args('id') id: string,
        @Args('place') place: string,
        @Args('price') price: number,
        @Args('date') date: Date,
        @Args('reason') reason: string,
        @Args('recurring') recurring: boolean,
        @Args('recurUntil', { nullable: true }) recurUntil: Date,
        @Args('budget') budget: string,
    ): Promise<Expense> {
        const expenseDto: ExpenseDto = new ExpenseDto()
        expenseDto.place = place
        expenseDto.price = price
        expenseDto.date = date
        expenseDto.reason = reason
        expenseDto.recurring = recurring
        expenseDto.recurUntil = recurUntil
        expenseDto.budget = budget
        return await this.expensesService.update(id, expenseDto)
    }

    @Mutation(() => Expense)
    @UseGuards(GqlAuthGuard)
    async deleteExpense(@Args('id') id: string): Promise<Expense> {
        return await this.expensesService.delete(id)
    }
}
