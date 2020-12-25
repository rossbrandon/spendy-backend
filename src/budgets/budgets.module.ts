import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Expense, ExpenseSchema} from 'src/expenses/expense.schema'
import {ExpensesService} from 'src/expenses/expenses.service'
import {Budget, BudgetSchema} from './budget.schema'
import {BudgetsController} from './budgets.controller'
import {BudgetsResolver} from './budgets.resolver'
import {BudgetsService} from './budgets.service'

@Module({
    imports: [
        MongooseModule.forFeature([{name: Budget.name, schema: BudgetSchema}]),
        MongooseModule.forFeature([
            {name: Expense.name, schema: ExpenseSchema},
        ]),
    ],
    controllers: [BudgetsController],
    providers: [BudgetsService, BudgetsResolver, ExpensesService],
})
export class BudgetsModule {}
