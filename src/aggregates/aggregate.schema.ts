import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Budget } from 'src/budgets/budget.schema'

export type AggregateDocument = Aggregate & Document

@ObjectType()
@Schema()
export class Aggregate {
    @Field(() => Budget)
    @Prop({ type: Types.ObjectId, ref: 'Budget' })
    budget: string | Types.ObjectId | Budget

    @Field()
    month: number

    @Field()
    @Prop()
    total: number
}

export const AggregateSchema = SchemaFactory.createForClass(Aggregate)
