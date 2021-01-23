import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BudgetDto } from './budget.dto'
import { Budget, BudgetDocument } from './budget.schema'

@Injectable()
export class BudgetsService {
    constructor(
        @Inject(REQUEST) private request: any,
        @InjectModel(Budget.name)
        private readonly budgetModel: Model<BudgetDocument>,
    ) {}

    async findAll(): Promise<Budget[]> {
        return await this.budgetModel
            .find({ userEmail: this.getUserEmail() })
            .exec()
    }

    async findActive(): Promise<Budget[]> {
        const currentDate: Date = new Date()
        const firstDayOfCurrentMonth: Date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
        )
        firstDayOfCurrentMonth.setUTCHours(0, 0, 0, 0)
        const lastDayOfCurrentMonth: Date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
        )
        lastDayOfCurrentMonth.setUTCHours(0, 0, 0, 0)
        return this.budgetModel.find({
            userEmail: this.getUserEmail(),
            startDate: {
                $lte: lastDayOfCurrentMonth,
            },
            $or: [
                {
                    endDate: null,
                },
                {
                    endDate: {
                        $gte: firstDayOfCurrentMonth,
                    },
                },
            ],
        })
    }

    async find(id): Promise<Budget> {
        return await this.budgetModel
            .findOne({ _id: id, userEmail: this.getUserEmail() })
            .exec()
    }

    async create(budgetDto: BudgetDto): Promise<Budget> {
        budgetDto.userEmail = this.getUserEmail()
        const createdBudget = new this.budgetModel(budgetDto)
        return createdBudget.save()
    }

    async update(id, budgetDto: BudgetDto): Promise<Budget> {
        budgetDto.userEmail = this.getUserEmail()
        const editedBudget = await this.budgetModel.findOneAndUpdate(
            { _id: id, userEmail: this.getUserEmail() },
            budgetDto,
            { new: true },
        )
        return editedBudget
    }

    async delete(id): Promise<Budget> {
        return await this.budgetModel.findOneAndDelete({
            _id: id,
            userEmail: this.getUserEmail(),
        })
    }

    async batchInsert(batchList: BudgetDto[]): Promise<any> {
        return await this.budgetModel
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
