import {Inject, Injectable} from '@nestjs/common'
import {REQUEST} from '@nestjs/core'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Expense, ExpenseDocument} from './expense.schema'
import {CreateExpenseDto} from './create-expense.dto'

@Injectable()
export class ExpensesService {
    constructor(
        @Inject(REQUEST) private request: any,
        @InjectModel(Expense.name)
        private readonly expenseModel: Model<ExpenseDocument>,
    ) {}

    private readonly audience: string = process.env.AUTH0_AUDIENCE

    async findAll(): Promise<Expense[]> {
        //const email = this.request.user[`${this.audience}/email`]
        const email = 'ross.brandon3@gmail.com'
        return this.expenseModel.find({user_email: email}).exec()
    }

    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        const createdExpense = new this.expenseModel(createExpenseDto)
        return createdExpense.save()
    }

    async find(id): Promise<Expense> {
        const expense = await this.expenseModel.findById(id).exec()
        return expense
    }

    async update(id, createExpenseDto: CreateExpenseDto): Promise<Expense> {
        const editedExpense = await this.expenseModel.findByIdAndUpdate(
            id,
            createExpenseDto,
            {new: true},
        )
        return editedExpense
    }

    async delete(id): Promise<Expense> {
        const deletedExpense = await this.expenseModel.findByIdAndRemove(id)
        return deletedExpense
    }

    async batchInsert(batchList: CreateExpenseDto[]): Promise<any> {
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
}
