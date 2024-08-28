import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from 'src/entities/user.entity'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Patch(':id/password')
  @ApiCreatedResponse({ type: UserEntity })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = updatePasswordDto;
    await this.usersService.updatePassword(String(id), currentPassword, newPassword, confirmPassword );
  }

}