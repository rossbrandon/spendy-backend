import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { BudgetsService } from './budgets.service'
import { Budget } from './budget.schema'
import { BudgetDto } from './budget.dto'
import { AuthGuard } from '@nestjs/passport'
import { Permissions } from '../authz/permissions.decorator'
import { PermissionsGuard } from '../authz/permissions.guard'

@Controller('v1/budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<Budget[]> {
        return await this.budgetsService.findActive()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async find(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.find(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body('budget') budget: BudgetDto): Promise<Budget> {
        return await this.budgetsService.create(budget)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id') id: string,
        @Body('budget') budget: BudgetDto,
    ): Promise<Budget> {
        return await this.budgetsService.update(id, budget)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.delete(id)
    }

    @Post('batch')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('admin')
    async batch(@Body() budgets: BudgetDto[]): Promise<any> {
        return await this.budgetsService.batchInsert(budgets)
    }
}
