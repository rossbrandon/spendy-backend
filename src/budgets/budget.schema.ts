import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type BudgetDocument = Budget & Document

@Schema()
export class Budget {
    @Prop()
    name: string

    @Prop()
    user_email: string

    @Prop()
    amount: number

    @Prop()
    start_date: string

    @Prop()
    end_date: string

    @Prop()
    show_in_menu: boolean

    @Prop()
    created_at: string

    @Prop()
    updated_at: string
}

export const BudgetSchema = SchemaFactory.createForClass(Budget)
