import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { join } from 'path'
import { AuthzModule } from './authz/authz.module'
import { BudgetsModule } from './budgets/budgets.module'
import { ExpensesModule } from './expenses/expenses.module'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            useFindAndModify: false,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req }),
        }),
        AuthzModule,
        BudgetsModule,
        ExpensesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
