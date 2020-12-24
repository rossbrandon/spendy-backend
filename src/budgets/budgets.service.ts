import {Inject, Injectable} from '@nestjs/common'
import {REQUEST} from '@nestjs/core'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Budget, BudgetDocument} from './budget.schema'
import {CreateBudgetDto} from './create-budget.dto'

@Injectable()
export class BudgetsService {
    constructor(
        @Inject(REQUEST) private request: any,
        @InjectModel(Budget.name)
        private readonly budgetModel: Model<BudgetDocument>,
    ) {}

    private readonly audience: string = process.env.AUTH0_AUDIENCE

    async findAll(): Promise<Budget[]> {
        //const email = this.request.user[`${this.audience}/email`]
        const email = 'ross.brandon3@gmail.com'
        return this.budgetModel.find({user_email: email}).exec()
    }

    async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
        const createdBudget = new this.budgetModel(createBudgetDto)
        return createdBudget.save()
    }

    async find(id): Promise<Budget> {
        const budget = await this.budgetModel.findById(id).exec()
        return budget
    }

    async update(id, createBudgetDto: CreateBudgetDto): Promise<Budget> {
        const editedBudget = await this.budgetModel.findByIdAndUpdate(
            id,
            createBudgetDto,
            {new: true},
        )
        return editedBudget
    }

    async delete(id): Promise<Budget> {
        const deletedBudget = await this.budgetModel.findByIdAndRemove(id)
        return deletedBudget
    }

    async batchInsert(batchList: CreateBudgetDto[]): Promise<any> {
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
}
