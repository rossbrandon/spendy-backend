import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ExpenseDto } from './expense.dto'
import { Aggregate, Expense, ExpenseDocument } from './expense.schema'

@Injectable()
export class ExpensesService {
    constructor(
        @Inject(REQUEST) private request: any,
        @InjectModel(Expense.name)
        private readonly expenseModel: Model<ExpenseDocument>,
    ) {}

    async findAll(): Promise<Expense[]> {
        return this.expenseModel.find({ userEmail: this.getUserEmail() }).exec()
    }

    async findByTag(tag: string): Promise<Expense[]> {
        return this.expenseModel.find({
            userEmail: this.getUserEmail(),
            tags: [tag],
        })
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
        return this.expenseModel.find({
            userEmail: this.getUserEmail(),
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        })
    }

    async findByBudget(
        budgetId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Expense[]> {
        return this.expenseModel.find({
            userEmail: this.getUserEmail(),
            budget: budgetId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        })
    }

    async find(id): Promise<Expense> {
        return await this.expenseModel
            .findOne({ _id: id, userEmail: this.getUserEmail() })
            .exec()
    }

    async aggregateSum(startDate: Date, endDate: Date): Promise<Aggregate[]> {
        return await this.expenseModel
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
                            month: { $substr: ['$date', 0, 7] },
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
    }

    async aggregatePlaces(): Promise<Aggregate[]> {
        return await this.expenseModel
            .aggregate([
                {
                    $match: {
                        userEmail: this.getUserEmail(),
                    },
                },
                { $unwind: '$place' },
                {
                    $group: {
                        _id: {
                            place: '$place',
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } },
                { $limit: 10 },
                {
                    $project: {
                        _id: 0,
                        place: '$_id.place',
                        count: 1,
                    },
                },
            ])
            .exec()
    }

    async aggregateTags(): Promise<Aggregate[]> {
        return await this.expenseModel
            .aggregate([
                {
                    $match: {
                        userEmail: this.getUserEmail(),
                    },
                },
                { $unwind: '$tags' },
                {
                    $group: {
                        _id: {
                            tags: '$tags',
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } },
                { $limit: 10 },
                {
                    $project: {
                        _id: 0,
                        tag: '$_id.tags',
                        count: 1,
                    },
                },
            ])
            .exec()
    }

    async budgetSum(
        budgetId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Aggregate[]> {
        return await this.expenseModel
            .aggregate([
                {
                    $match: {
                        userEmail: this.getUserEmail(),
                        date: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                        budget: budgetId,
                    },
                },
                {
                    $group: {
                        _id: '$budget',
                        total: {
                            $sum: '$price',
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        budget: '$_id',
                        total: 1,
                    },
                },
            ])
            .exec()
    }

    async create(expenseDto: ExpenseDto): Promise<Expense> {
        expenseDto.userEmail = this.getUserEmail()
        const createdExpense = new this.expenseModel(expenseDto)
        return createdExpense.save()
    }

    async update(id, expenseDto: ExpenseDto): Promise<Expense> {
        const editedExpense = await this.expenseModel.findOneAndUpdate(
            { _id: id, userEmail: this.getUserEmail() },
            expenseDto,
            { new: true },
        )
        return editedExpense
    }

    async delete(id): Promise<Expense> {
        return await this.expenseModel.findOneAndDelete({
            _id: id,
            userEmail: this.getUserEmail(),
        })
    }

    async batchInsert(batchList: ExpenseDto[]): Promise<any> {
        return await this.expenseModel
            .insertMany(batchList)
            .then(function (mongooseDocuments) {
                console.log(mongooseDocuments)
                return mongooseDocuments
            })
            .catch(function (err) {
                console.log(`An error occurred: ${err}`)
                return `An error occurred: ${err}`
            })
    }

    private getUserEmail(): string {
        const user =
            this.request.user === undefined
                ? this.request.req.user
                : this.request.user
        return user[`${process.env.AUTH0_AUDIENCE}email`]
    }
}
