"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    listAll() {
        return this.prisma.company.findMany({
            include: { _count: { select: { users: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto) {
        const existing = await this.prisma.company.findUnique({ where: { slug: dto.slug } });
        if (existing) {
            throw new common_1.ConflictException('Slug already in use');
        }
        return this.prisma.company.create({ data: dto });
    }
    async update(companyId, dto) {
        const company = await this.prisma.company.findUnique({ where: { id: companyId } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return this.prisma.company.update({ where: { id: companyId }, data: dto });
    }
    async assignUser(companyId, dto) {
        const company = await this.prisma.company.findUnique({ where: { id: companyId } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
            include: { company: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.companyId && user.companyId !== companyId) {
            throw new common_1.ConflictException(`Este usuario ya pertenece a la empresa "${user.company?.name}". Desasígnalo primero.`);
        }
        return this.prisma.user.update({
            where: { id: dto.userId },
            data: { companyId, role: user.role === 'ADMIN' ? user.role : 'COMPANY_ADMIN' },
        });
    }
    async updateMine(userId, dto) {
        const me = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!me?.companyId) {
            throw new common_1.ForbiddenException('Not assigned to a company');
        }
        return this.prisma.company.update({ where: { id: me.companyId }, data: dto });
    }
    async addUserToMyCompany(userId, dto) {
        const me = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!me?.companyId) {
            throw new common_1.ForbiddenException('Not assigned to a company');
        }
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
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
    async unassignUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { companyId: null, role: user.role === 'ADMIN' ? user.role : 'USER' },
        });
    }
    async getPublicBySlug(slug) {
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
            throw new common_1.NotFoundException('Company not found');
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
                slug: u.profile.slug,
                fullName: u.profile.fullName,
                position: u.profile.position,
                photo: u.profile.photo,
            })),
        };
    }
    async getCompanyDetail(companyId) {
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
            throw new common_1.NotFoundException('Company not found');
        }
        const profileIds = company.users.map((u) => u.profile?.id).filter((id) => !!id);
        const analyticsByProfile = await this.prisma.analyticsEvent.groupBy({
            by: ['profileId'],
            where: { profileId: { in: profileIds } },
            _count: { _all: true },
        });
        const viewsMap = new Map(analyticsByProfile.map((a) => [a.profileId, a._count._all]));
        const leadsByProfile = await this.prisma.lead.groupBy({
            by: ['profileId'],
            where: { profileId: { in: profileIds } },
            _count: { _all: true },
        });
        const leadsMap = new Map(leadsByProfile.map((l) => [l.profileId, l._count._all]));
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
                profileId: u.profile?.id ?? null,
                name: u.name,
                email: u.email,
                status: u.status,
                slug: u.profile?.slug ?? null,
                linkCount: u.profile?._count.links ?? 0,
                totalEvents: u.profile ? viewsMap.get(u.profile.id) ?? 0 : 0,
                leadCount: u.profile ? leadsMap.get(u.profile.id) ?? 0 : 0,
            })),
            totalEvents: [...viewsMap.values()].reduce((sum, v) => sum + v, 0),
            totalLeads: [...leadsMap.values()].reduce((sum, v) => sum + v, 0),
        };
    }
    async getMyCompany(userId) {
        const me = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!me?.companyId) {
            throw new common_1.ForbiddenException('Not assigned to a company');
        }
        return this.getCompanyDetail(me.companyId);
    }
    async getDetailForAdmin(companyId) {
        return this.getCompanyDetail(companyId);
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map