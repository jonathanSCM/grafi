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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createForSlug(slug, dto) {
        const profile = await this.prisma.profile.findUnique({ where: { slug } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return this.prisma.lead.create({
            data: {
                profileId: profile.id,
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
                source: dto.source,
            },
        });
    }
    async listForUser(userId) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return this.prisma.lead.findMany({
            where: { profileId: profile.id },
            orderBy: { createdAt: 'desc' },
        });
    }
    async listForCompany(userId) {
        const me = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!me?.companyId) {
            throw new common_1.ForbiddenException('Not assigned to a company');
        }
        const profiles = await this.prisma.profile.findMany({
            where: { user: { companyId: me.companyId } },
            select: { id: true, fullName: true, slug: true },
        });
        const profileIds = profiles.map((p) => p.id);
        const profileMap = new Map(profiles.map((p) => [p.id, p]));
        const leads = await this.prisma.lead.findMany({
            where: { profileId: { in: profileIds } },
            orderBy: { createdAt: 'desc' },
        });
        return leads.map((lead) => ({
            ...lead,
            collaborator: profileMap.get(lead.profileId) ?? null,
        }));
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map