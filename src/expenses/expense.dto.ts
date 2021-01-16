import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
} from 'class-validator'
import { Budget } from 'src/budgets/budget.schema'
import { Types } from 'mongoose'

export class ExpenseDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsEmail() userEmail: string
    @IsString() place: string
    @IsDateString() date: Date
    @IsNumber() price: number
    @IsString() reason: string
    @IsBoolean() recurring: boolean
    @IsDateString() @IsOptional() recurUntil: Date
    @IsDateString() @IsOptional() readonly createdAt: Date
    @IsDateString() @IsOptional() readonly updatedAt: Date
    @IsString() budget: string | Types.ObjectId | Budget
}
