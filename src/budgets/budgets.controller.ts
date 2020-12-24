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
import {BudgetsService} from './budgets.service'
import {Budget} from './budget.schema'
import {CreateBudgetDto} from './create-budget.dto'
// import {AuthGuard} from '@nestjs/passport'
// import {Permissions} from '../authz/permissions.decorator'
// import {PermissionsGuard} from '../authz/permissions.guard'

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Get()
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read')
    async findAll(): Promise<Budget[]> {
        return await this.budgetsService.findAll()
    }

    @Get(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read')
    async find(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.find(id)
    }

    @Post()
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('create')
    async create(@Body('budget') budget: CreateBudgetDto): Promise<Budget> {
        return await this.budgetsService.create(budget)
    }

    @Put(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('update')
    async update(
        @Param('id') id: string,
        @Body('budget') budget: CreateBudgetDto,
    ): Promise<Budget> {
        return await this.budgetsService.update(id, budget)
    }

    @Delete(':id')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('delete')
    async delete(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.delete(id)
    }

    @Post('batch')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('admin')
    async batch(@Body() budgets: CreateBudgetDto[]): Promise<any> {
        return await this.budgetsService.batchInsert(budgets)
    }
}
