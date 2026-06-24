"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogService = class CatalogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCompanyId(userId) {
        const me = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!me?.companyId) {
            throw new common_1.ForbiddenException('Not assigned to a company');
        }
        return me.companyId;
    }
    async assertOwnership(userId, itemId) {
        const companyId = await this.getCompanyId(userId);
        const item = await this.prisma.catalogItem.findUnique({ where: { id: itemId } });
        if (!item) {
            throw new common_1.NotFoundException('Catalog item not found');
        }
        if (item.companyId !== companyId) {
            throw new common_1.ForbiddenException();
        }
        return item;
    }
    async list(userId) {
        const companyId = await this.getCompanyId(userId);
        return this.prisma.catalogItem.findMany({
            where: { companyId },
            include: { assignedTo: { select: { id: true, fullName: true, slug: true } } },
            orderBy: { order: 'asc' },
        });
    }
    async create(userId, dto) {
        const companyId = await this.getCompanyId(userId);
        const count = await this.prisma.catalogItem.count({ where: { companyId } });
        return this.prisma.catalogItem.create({
            data: {
                companyId,
                title: dto.title,
                description: dto.description,
                image: dto.image,
                link: dto.link,
                isActive: dto.isActive ?? true,
                order: count,
                assignedTo: dto.assignedProfileIds
                    ? { connect: dto.assignedProfileIds.map((id) => ({ id })) }
                    : undefined,
            },
            include: { assignedTo: { select: { id: true, fullName: true, slug: true } } },
        });
    }
    async update(userId, itemId, dto) {
        await this.assertOwnership(userId, itemId);
        return this.prisma.catalogItem.update({
            where: { id: itemId },
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image,
                link: dto.link,
                isActive: dto.isActive,
                assignedTo: dto.assignedProfileIds
                    ? { set: dto.assignedProfileIds.map((id) => ({ id })) }
                    : undefined,
            },
            include: { assignedTo: { select: { id: true, fullName: true, slug: true } } },
        });
    }
    async remove(userId, itemId) {
        await this.assertOwnership(userId, itemId);
        return this.prisma.catalogItem.delete({ where: { id: itemId } });
    }
    async listForProfile(slug) {
        const profile = await this.prisma.profile.findUnique({ where: { slug } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return this.prisma.catalogItem.findMany({
            where: { isActive: true, assignedTo: { some: { id: profile.id } } },
            orderBy: { order: 'asc' },
        });
    }
    async listForCompanySlug(slug) {
        const company = await this.prisma.company.findUnique({ where: { slug } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return this.prisma.catalogItem.findMany({
            where: { companyId: company.id, isActive: true },
            orderBy: { order: 'asc' },
        });
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map