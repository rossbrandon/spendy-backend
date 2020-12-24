import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type ExpenseDocument = Expense & Document

@Schema()
export class Expense {
    @Prop()
    budget_id: string

    @Prop()
    user_email: string

    @Prop()
    place: string

    @Prop()
    date: string

    @Prop()
    price: number

    @Prop()
    recurring: boolean

    @Prop()
    recur_until: string

    @Prop()
    created_at: string

    @Prop()
    updated_at: string
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
