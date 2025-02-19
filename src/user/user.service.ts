import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, userData: EditUserDto) {
    if (!userId) {
      throw new Error('User ID must be provided');
    }
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...userData },
    });
    delete user.hash;
    return user;
  }
}
