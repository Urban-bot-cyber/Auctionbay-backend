import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from 'src/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) { }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @Get()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  findAll() {
    return this.itemService.findAll()
  }

  @Get('/user/:user_id')
  @ApiOkResponse({ type: ItemEntity })
  findByUserId(@Param('user_id') user_id: string) {
    return this.itemService.findByUserId(user_id)
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

  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  @ApiCreatedResponse({ description: 'File uploaded successfully' })
  @ApiBadRequestResponse({ description: 'Invalid file upload request' })
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const filePath = `/files/${file.filename}`
    console.log(id,filePath)
    await this.itemService.updateItemImage(id, filePath)
    return { message: 'File uploaded successfully', fileName: file.filename }
  }
  
}