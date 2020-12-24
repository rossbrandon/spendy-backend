import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
} from 'class-validator'

export class CreateExpenseDto {
    @IsMongoId() @IsOptional() readonly _id: string
    @IsString() readonly budget_id: string
    @IsEmail() readonly user_email: string
    @IsString() readonly place: string
    @IsDateString() readonly date: string
    @IsNumber() readonly price: number
    @IsString() readonly reason: string
    @IsBoolean() readonly recurring: boolean
    @IsDateString() @IsOptional() readonly recur_until: string
    @IsDateString() @IsOptional() readonly created_at: string
    @IsDateString() @IsOptional() readonly updated_at: string
}
