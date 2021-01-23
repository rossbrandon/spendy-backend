import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Expense } from 'src/expenses/expense.schema'

export type BudgetDocument = Budget & Document

@Schema({ timestamps: true })
@ObjectType()
export class Budget {
    @Field(() => String)
    _id: Types.ObjectId

    @Field()
    @Prop()
    name: string

    @Field()
    @Prop()
    userEmail: string

    @Field()
    @Prop()
    amount: number

    @Field()
    @Prop()
    startDate: Date

    @Field({ nullable: true })
    @Prop()
    endDate: Date

    @Field()
    @Prop()
    showInMenu: boolean

    @Field()
    @Prop()
    sortOrder: number

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt: Date

    @Field(() => [Expense])
    @Prop({ type: Expense, ref: 'Expense' })
    expenses: [Expense]
}

export const BudgetSchema = SchemaFactory.createForClass(Budget)
