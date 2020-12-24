import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Budget, BudgetSchema} from './budget.schema'
import {BudgetsController} from './budgets.controller'
import {BudgetsResolver} from './budgets.resolver'
import {BudgetsService} from './budgets.service'

@Module({
    imports: [
        MongooseModule.forFeature([{name: Budget.name, schema: BudgetSchema}]),
    ],
    controllers: [BudgetsController],
    providers: [BudgetsService, BudgetsResolver],
})
export class BudgetsModule {}
