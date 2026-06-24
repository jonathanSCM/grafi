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
exports.SocialLinksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SocialLinksService = class SocialLinksService {
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
    async assertOwnership(userId, id) {
        const link = await this.prisma.socialLink.findUnique({ where: { id } });
        if (!link) {
            throw new common_1.NotFoundException('Social link not found');
        }
        const profileId = await this.getOwnedProfileId(userId);
        if (link.profileId !== profileId) {
            throw new common_1.ForbiddenException();
        }
        return link;
    }
    async list(userId) {
        const profileId = await this.getOwnedProfileId(userId);
        return this.prisma.socialLink.findMany({ where: { profileId }, orderBy: { order: 'asc' } });
    }
    async create(userId, dto) {
        const profileId = await this.getOwnedProfileId(userId);
        const count = await this.prisma.socialLink.count({ where: { profileId } });
        return this.prisma.socialLink.create({ data: { ...dto, profileId, order: count } });
    }
    async update(userId, id, dto) {
        await this.assertOwnership(userId, id);
        return this.prisma.socialLink.update({ where: { id }, data: dto });
    }
    async remove(userId, id) {
        await this.assertOwnership(userId, id);
        return this.prisma.socialLink.delete({ where: { id } });
    }
};
exports.SocialLinksService = SocialLinksService;
exports.SocialLinksService = SocialLinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SocialLinksService);
//# sourceMappingURL=social-links.service.js.map