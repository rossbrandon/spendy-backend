import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Permissions } from '../authz/permissions.decorator'
import { PermissionsGuard } from '../authz/permissions.guard'
import { ExpenseDto } from './expense.dto'
import { Aggregate, Expense } from './expense.schema'
import { ExpensesService } from './expenses.service'

@Controller('v1/expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findByDateRange(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<Expense[]> {
        return await this.expensesService.findByDateRange(startDate, endDate)
    }

    @Get('aggregate/sum')
    @UseGuards(AuthGuard('jwt'))
    async aggregateSum(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<Aggregate[]> {
        return await this.expensesService.aggregateSum(startDate, endDate)
    }

    @Get('aggregate/places')
    @UseGuards(AuthGuard('jwt'))
    async aggregatePlaces(): Promise<Aggregate[]> {
        return await this.expensesService.aggregatePlaces()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async find(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.find(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body('expense') expense: ExpenseDto): Promise<Expense> {
        return await this.expensesService.create(expense)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id') id: string,
        @Body('expense:expenses') expense: ExpenseDto,
    ): Promise<Expense> {
        return await this.expensesService.update(id, expense)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.delete(id)
    }

    @Post('batch')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('admin')
    async batch(@Body() expenses: ExpenseDto[]): Promise<any> {
        return await this.expensesService.batchInsert(expenses)
    }
}
