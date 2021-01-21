import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Aggregate, AggregateDocument } from './aggregate.schema'

@Injectable()
export class AggregatesService {
    constructor(
        @Inject(REQUEST) private request: any,
        @InjectModel(Aggregate.name)
        private readonly aggregateModel: Model<AggregateDocument>,
    ) {}

    async aggregateBudgets(
        startDate: Date,
        endDate: Date,
    ): Promise<Aggregate[]> {
        console.log(startDate)
        console.log(endDate)
        console.log(this.getUserEmail())
        const data = await this.aggregateModel
            .aggregate([
                {
                    $match: {
                        userEmail: this.getUserEmail(),
                        date: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $substr: ['$date', 5, 2] },
                            budget: '$budget',
                        },
                        total: {
                            $sum: '$price',
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        budget: '$_id.budget',
                        month: '$_id.month',
                        total: 1,
                    },
                },
            ])
            .exec()
        console.log(data)
        return data
    }

    private getUserEmail(): string {
        const user =
            this.request.user === undefined
                ? this.request.req.user
                : this.request.user
        return user[`${process.env.AUTH0_AUDIENCE}email`]
    }
}
