import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({
      include: { profile: true, plan: true, company: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createUser(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
        planId: dto.planId,
        companyId: dto.companyId,
      },
    });
    const { password, ...rest } = user;
    return rest;
  }

  async updateStatus(userId: string, dto: UpdateUserStatusDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({ where: { id: userId }, data: { status: dto.status } });
  }

  listCards() {
    return this.prisma.card.findMany({
      include: { profile: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  analyticsOverview() {
    return this.prisma.analyticsEvent.groupBy({
      by: ['eventType'],
      _count: { _all: true },
    });
  }
}
