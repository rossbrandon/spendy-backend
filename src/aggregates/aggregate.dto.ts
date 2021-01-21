import { IsString, IsNumber } from 'class-validator'
import { Budget } from 'src/budgets/budget.schema'
import { Types } from 'mongoose'

export class AggregateDto {
    @IsString() budget: string | Types.ObjectId | Budget
    @IsNumber() month: number
    @IsNumber() total: number
}
