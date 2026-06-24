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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createForUser(userId, dto) {
        const slugTaken = await this.prisma.profile.findUnique({ where: { slug: dto.slug } });
        if (slugTaken) {
            throw new common_1.ConflictException('Slug already in use');
        }
        return this.prisma.profile.create({
            data: { ...dto, userId },
        });
    }
    async findBySlug(slug) {
        const profile = await this.prisma.profile.findUnique({
            where: { slug, isActive: true },
            include: {
                links: { where: { isActive: true }, orderBy: { order: 'asc' } },
                socialLinks: { where: { isActive: true }, orderBy: { order: 'asc' } },
                user: { include: { company: true } },
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const { user, ...rest } = profile;
        return { ...rest, company: user.company };
    }
    async findByUserId(userId) {
        const profile = await this.prisma.profile.findUnique({
            where: { userId },
            include: { links: true, socialLinks: true, user: { include: { company: true } } },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const { user, ...rest } = profile;
        return { ...rest, company: user.company };
    }
    async updateByUserId(userId, dto) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
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
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map