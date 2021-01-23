import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Budget } from 'src/budgets/budget.schema'

export type ExpenseDocument = Expense & Document

@ObjectType()
@Schema({ timestamps: true })
export class Expense {
    @Field(() => String)
    _id: Types.ObjectId

    @Field()
    @Prop()
    userEmail: string

    @Field()
    @Prop()
    place: string

    @Field()
    @Prop()
    date: Date

    @Field()
    @Prop()
    price: number

    @Field()
    @Prop()
    reason: string

    @Field()
    @Prop()
    recurring: boolean

    @Field({ nullable: true })
    @Prop()
    recurUntil: Date

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt: Date

    @Field(() => Budget)
    @Prop({ type: Types.ObjectId, ref: 'Budget' })
    budget: string | Types.ObjectId | Budget
}

@ObjectType()
@Schema()
export class Aggregate {
    @Field(() => String)
    budget: Types.ObjectId

    @Field()
    @Prop()
    month: string

    @Field()
    @Prop()
    total: number

    @Field()
    @Prop()
    place: string

    @Field()
    @Prop()
    count: number
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
export const AggregateSchema = SchemaFactory.createForClass(Aggregate)
