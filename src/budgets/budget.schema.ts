import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ObjectType, Field} from '@nestjs/graphql'

export type BudgetDocument = Budget & Document

@Schema({timestamps: true})
@ObjectType()
export class Budget {
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

    @Field({nullable: true})
    @Prop()
    endDate: Date

    @Field()
    @Prop()
    showInMenu: boolean

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt: Date
}

export const BudgetSchema = SchemaFactory.createForClass(Budget)
