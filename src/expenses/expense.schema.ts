import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, Types} from 'mongoose'
import {ObjectType, Field} from '@nestjs/graphql'
import {Budget} from 'src/budgets/budget.schema'

export type ExpenseDocument = Expense & Document

@ObjectType()
@Schema({timestamps: true})
export class Expense {
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

    @Field({nullable: true})
    @Prop()
    recurUntil: Date

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt: Date

    @Field(() => Budget)
    @Prop({type: Types.ObjectId, ref: 'Budget'})
    budget: string | Types.ObjectId | Budget
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
