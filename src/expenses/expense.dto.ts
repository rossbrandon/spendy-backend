import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
} from 'class-validator'
import {Budget} from 'src/budgets/budget.schema'

export class ExpenseDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsEmail() userEmail: string
    @IsString() readonly place: string
    @IsDateString() readonly date: Date
    @IsNumber() readonly price: number
    @IsString() readonly reason: string
    @IsBoolean() readonly recurring: boolean
    @IsDateString() @IsOptional() readonly recurUntil: Date
    @IsDateString() @IsOptional() readonly createdAt: Date
    @IsDateString() @IsOptional() readonly updatedAt: Date
    @IsString() readonly budget: Budget
}
