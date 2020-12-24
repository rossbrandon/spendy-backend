import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
} from 'class-validator'

export class CreateBudgetDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsString() readonly name: string
    @IsEmail() readonly user_email: string
    @IsNumber() readonly amount: number
    @IsDateString() readonly start_date: string
    @IsDateString() @IsOptional() readonly end_date: string
    @IsBoolean() readonly show_in_menu: boolean
    @IsDateString() readonly created_at: string
    @IsDateString() readonly updated_at: string
}
