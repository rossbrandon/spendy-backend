import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AggregatesResolver } from './aggregates.resolver'
import { Aggregate, AggregateSchema } from './aggregate.schema'
import { AggregatesController } from './aggregates.controller'
import { AggregatesService } from './aggregates.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Aggregate.name, schema: AggregateSchema },
        ]),
    ],
    controllers: [AggregatesController],
    providers: [AggregatesService, AggregatesResolver],
})
export class ExpensesModule {}
