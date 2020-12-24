import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    // UseGuards,
} from '@nestjs/common'
import {ExpensesService} from './expenses.service'
import {Expense} from './expense.schema'
import {CreateExpenseDto} from './create-expense.dto'
// import {AuthGuard} from '@nestjs/passport'
// import {Permissions} from '../authz/permissions.decorator'
// import {PermissionsGuard} from '../authz/permissions.guard'

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @Get()
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read')
    async findAll(): Promise<Expense[]> {
        return await this.expensesService.findAll()
    }

    @Get(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read')
    async find(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.find(id)
    }

    @Post()
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('create')
    async create(@Body('expense') expense: CreateExpenseDto): Promise<Expense> {
        return await this.expensesService.create(expense)
    }

    @Put(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('update')
    async update(
        @Param('id') id: string,
        @Body('expense') expense: CreateExpenseDto,
    ): Promise<Expense> {
        return await this.expensesService.update(id, expense)
    }

    @Delete(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('delete')
    async delete(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.delete(id)
    }

    @Post('batch')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('admin')
    async batch(@Body() expenses: CreateExpenseDto[]): Promise<any> {
        return await this.expensesService.batchInsert(expenses)
    }
}
