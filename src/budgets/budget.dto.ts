import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsEmail,
    IsMongoId,
    IsDateString,
} from 'class-validator'
import { Expense } from 'src/expenses/expense.schema'

export class BudgetDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsString() name: string
    @IsEmail() userEmail: string
    @IsNumber() amount: number
    @IsDateString() startDate: Date
    @IsDateString() @IsOptional() endDate: Date
    @IsBoolean() showInMenu: boolean
    @IsDateString() @IsOptional() readonly createdAt: Date
    @IsDateString() @IsOptional() readonly updatedAt: Date
    expenses: [Expense]
}
