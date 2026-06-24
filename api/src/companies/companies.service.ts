import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AddCompanyUserDto } from './dto/add-company-user.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  listAll() {
    return this.prisma.company.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateCompanyDto) {
    const existing = await this.prisma.company.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('Slug already in use');
    }
    return this.prisma.company.create({ data: dto });
  }

  async update(companyId: string, dto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return this.prisma.company.update({ where: { id: companyId }, data: dto });
  }

  async assignUser(companyId: string, dto: AssignUserDto) {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      include: { company: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.companyId && user.companyId !== companyId) {
      throw new ConflictException(
        `Este usuario ya pertenece a la empresa "${user.company?.name}". Desasígnalo primero.`,
      );
    }
    return this.prisma.user.update({
      where: { id: dto.userId },
      data: { companyId, role: user.role === 'ADMIN' ? user.role : 'COMPANY_ADMIN' },
    });
  }

  async updateMine(userId: string, dto: UpdateCompanyDto) {
    const me = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!me?.companyId) {
      throw new ForbiddenException('Not assigned to a company');
    }
    return this.prisma.company.update({ where: { id: me.companyId }, data: dto });
  }

  async addUserToMyCompany(userId: string, dto: AddCompanyUserDto) {
    const me = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!me?.companyId) {
      throw new ForbiddenException('Not assigned to a company');
    }
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
        companyId: me.companyId,
        role: 'COMPANY_ADMIN',
      },
    });
    const { password, ...rest } = user;
    return rest;
  }

  async unassignUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: { companyId: null, role: user.role === 'ADMIN' ? user.role : 'USER' },
    });
  }

  async getPublicBySlug(slug: string) {
    const company = await this.prisma.company.findUnique({
      where: { slug },
      include: {
        users: {
          where: { status: 'ACTIVE', profile: { isActive: true } },
          include: { profile: true },
        },
      },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return {
      name: company.name,
      slug: company.slug,
      description: company.description,
      logo: company.logo,
      website: company.website,
      redirectEnabled: company.redirectEnabled,
      theme: company.theme,
      backgroundType: company.backgroundType,
      backgroundColor: company.backgroundColor,
      backgroundTo: company.backgroundTo,
      buttonColor: company.buttonColor,
      buttonTextColor: company.buttonTextColor,
      textColor: company.textColor,
      collaborators: company.users
        .filter((u) => u.profile)
        .map((u) => ({
          slug: u.profile!.slug,
          fullName: u.profile!.fullName,
          position: u.profile!.position,
          photo: u.profile!.photo,
        })),
    };
  }

  private async getCompanyDetail(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        users: {
          include: {
            profile: {
              include: {
                _count: { select: { links: true } },
              },
            },
          },
        },
      },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const profileIds = company.users.map((u) => u.profile?.id).filter((id): id is string => !!id);

    const analyticsByProfile = await this.prisma.analyticsEvent.groupBy({
      by: ['profileId'],
      where: { profileId: { in: profileIds } },
      _count: { _all: true },
    });

    const viewsMap = new Map(analyticsByProfile.map((a) => [a.profileId, a._count._all]));

    return {
      id: company.id,
      name: company.name,
      slug: company.slug,
      description: company.description,
      logo: company.logo,
      website: company.website,
      redirectEnabled: company.redirectEnabled,
      theme: company.theme,
      backgroundType: company.backgroundType,
      backgroundColor: company.backgroundColor,
      backgroundTo: company.backgroundTo,
      buttonColor: company.buttonColor,
      buttonTextColor: company.buttonTextColor,
      textColor: company.textColor,
      collaborators: company.users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        status: u.status,
        slug: u.profile?.slug ?? null,
        linkCount: u.profile?._count.links ?? 0,
        totalEvents: u.profile ? viewsMap.get(u.profile.id) ?? 0 : 0,
      })),
      totalEvents: [...viewsMap.values()].reduce((sum, v) => sum + v, 0),
    };
  }

  async getMyCompany(userId: string) {
    const me = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!me?.companyId) {
      throw new ForbiddenException('Not assigned to a company');
    }
    return this.getCompanyDetail(me.companyId);
  }

  async getDetailForAdmin(companyId: string) {
    return this.getCompanyDetail(companyId);
  }
}
