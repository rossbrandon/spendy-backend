import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Expense, ExpenseDocument } from './expense.schema'
import { ExpenseDto } from './expense.dto'

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

    async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
        return this.expenseModel.find({
            userEmail: this.getUserEmail(),
            date: {
                $gte: startDate,
                $lte: endDate,
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
                $gte: startDate,
                $lte: endDate,
            },
        })
    }

    async find(id): Promise<Expense> {
        return await this.expenseModel
            .findOne({ _id: id, userEmail: this.getUserEmail() })
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
