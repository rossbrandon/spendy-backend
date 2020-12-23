import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common'
import {ItemsService} from './items.service'
import {Items} from '../items'
import {Item} from '../item'
import {AuthGuard} from '@nestjs/passport'
import {Permissions} from '../permissions.decorator'
import {PermissionsGuard} from '../permissions.guard'

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async findAll(): Promise<Items> {
        return this.itemsService.findAll()
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<Item> {
        return this.itemsService.find(id)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    @Permissions('create:items')
    async create(@Body('item') item: Item): Promise<void> {
        this.itemsService.create(item)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Put()
    @Permissions('update:items')
    async update(@Body('item') item: Item): Promise<void> {
        this.itemsService.update(item)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Delete(':id')
    @Permissions('delete:items')
    async delete(@Param('id') id: number): Promise<void> {
        this.itemsService.delete(id)
    }
}
