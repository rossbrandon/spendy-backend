import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ItemsModule} from './items/items.module'
import {AuthzModule} from './authz/authz.module'
import {BudgetsModule} from './budgets/budgets.module'
import {ExpensesModule} from './expenses/expenses.module'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        ItemsModule,
        AuthzModule,
        BudgetsModule,
        ExpensesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
