import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'
import { Types } from 'mongoose'
import { Budget } from 'src/budgets/budget.schema'

export class ExpenseDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsEmail() userEmail: string
    @IsString() place: string
    @IsDateString() date: Date
    @IsNumber() price: number
    @IsString() reason: string
    @IsBoolean() recurring: boolean
    @IsDateString() @IsOptional() recurUntil?: Date
    @IsArray() @IsOptional() tags?: string[]
    @IsDateString() @IsOptional() readonly createdAt: Date
    @IsDateString() @IsOptional() readonly updatedAt: Date
    @IsString() budget: string | Types.ObjectId | Budget
}
