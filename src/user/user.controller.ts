import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private authService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  edit(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.authService.editUser(user.id, dto);
  }
}
