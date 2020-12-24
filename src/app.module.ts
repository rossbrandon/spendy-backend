import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {GraphQLModule} from '@nestjs/graphql'
import {ItemsModule} from './items/items.module'
import {AuthzModule} from './authz/authz.module'
import {BudgetsModule} from './budgets/budgets.module'
import {ExpensesModule} from './expenses/expenses.module'
import {join} from 'path'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        ItemsModule,
        AuthzModule,
        BudgetsModule,
        ExpensesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
