import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from 'src/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) { }

  @Post()
  @ApiCreatedResponse({ type: ItemEntity })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  findAll() {
    return this.itemService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: ItemEntity })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id)
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ItemEntity })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: ItemEntity })
  remove(@Param('id') id: string) {
    return this.itemService.remove(id)
  }

}