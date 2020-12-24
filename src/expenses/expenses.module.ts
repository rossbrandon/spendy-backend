import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ExpensesResolver} from './expenses.resolver'
import {Expense, ExpenseSchema} from './expense.schema'
import {ExpensesController} from './expenses.controller'
import {ExpensesService} from './expenses.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Expense.name, schema: ExpenseSchema},
        ]),
    ],
    controllers: [ExpensesController],
    providers: [ExpensesService, ExpensesResolver],
})
export class ExpensesModule {}
