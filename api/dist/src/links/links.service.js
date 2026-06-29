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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const limits_1 = require("../plans/limits");
let LinksService = class LinksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOwnedProfileId(userId) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return profile.id;
    }
    async assertOwnership(userId, linkId) {
        const link = await this.prisma.link.findUnique({ where: { id: linkId } });
        if (!link) {
            throw new common_1.NotFoundException('Link not found');
        }
        const profileId = await this.getOwnedProfileId(userId);
        if (link.profileId !== profileId) {
            throw new common_1.ForbiddenException();
        }
        return link;
    }
    async list(userId) {
        const profileId = await this.getOwnedProfileId(userId);
        return this.prisma.link.findMany({ where: { profileId }, orderBy: { order: 'asc' } });
    }
    async getLimit(userId) {
        const profileId = await this.getOwnedProfileId(userId);
        const count = await this.prisma.link.count({ where: { profileId } });
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true, company: { include: { plan: true } } },
        });
        return { count, limit: (0, limits_1.effectiveButtonLimit)(user) };
    }
    async create(userId, dto) {
        const profileId = await this.getOwnedProfileId(userId);
        const count = await this.prisma.link.count({ where: { profileId } });
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true, company: { include: { plan: true } } },
        });
        const limit = (0, limits_1.effectiveButtonLimit)(user);
        if (count >= limit) {
            throw new common_1.ForbiddenException(`Alcanzaste el límite de ${limit} botones de tu plan. Contacta a soporte para ampliarlo.`);
        }
        return this.prisma.link.create({
            data: { ...dto, profileId, order: count },
        });
    }
    async update(userId, linkId, dto) {
        await this.assertOwnership(userId, linkId);
        return this.prisma.link.update({ where: { id: linkId }, data: dto });
    }
    async remove(userId, linkId) {
        await this.assertOwnership(userId, linkId);
        return this.prisma.link.delete({ where: { id: linkId } });
    }
    async reorder(userId, dto) {
        const profileId = await this.getOwnedProfileId(userId);
        const links = await this.prisma.link.findMany({ where: { profileId } });
        const ownedIds = new Set(links.map((l) => l.id));
        const invalid = dto.orderedIds.some((id) => !ownedIds.has(id));
        if (invalid) {
            throw new common_1.ForbiddenException('Invalid link ids');
        }
        await this.prisma.$transaction(dto.orderedIds.map((id, index) => this.prisma.link.update({ where: { id }, data: { order: index } })));
        return this.list(userId);
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LinksService);
//# sourceMappingURL=links.service.js.map