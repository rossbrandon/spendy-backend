import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
        }),
    )
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))
    await app.listen(process.env.PORT)
}
bootstrap()
