import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(userId: string, dto: CreateProfileDto) {
    const slugTaken = await this.prisma.profile.findUnique({ where: { slug: dto.slug } });
    if (slugTaken) {
      throw new ConflictException('Slug already in use');
    }

    return this.prisma.profile.create({
      data: { ...dto, userId },
    });
  }

  async findBySlug(slug: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { slug, isActive: true },
      include: {
        links: { where: { isActive: true }, orderBy: { order: 'asc' } },
        socialLinks: { where: { isActive: true }, orderBy: { order: 'asc' } },
        user: { include: { company: true } },
      },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    const { user, ...rest } = profile;
    return { ...rest, company: user.company };
  }

  async findByUserId(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { links: true, socialLinks: true, user: { include: { company: true } } },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    const { user, ...rest } = profile;
    return { ...rest, company: user.company };
  }

  async updateByUserId(userId: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    });

    const data = user?.company ? { ...dto, companyName: user.company.name } : dto;

    return this.prisma.profile.update({
      where: { userId },
      data,
    });
  }
}
