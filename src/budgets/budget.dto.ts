import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsEmail,
    IsMongoId,
    IsDateString,
} from 'class-validator'

export class BudgetDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsString() readonly name: string
    @IsEmail() userEmail: string
    @IsNumber() readonly amount: number
    @IsDateString() readonly startDate: Date
    @IsDateString() @IsOptional() readonly endDate: Date
    @IsBoolean() readonly showInMenu: boolean
    @IsDateString() @IsOptional() readonly createdAt: Date
    @IsDateString() @IsOptional() readonly updatedAt: Date
}
