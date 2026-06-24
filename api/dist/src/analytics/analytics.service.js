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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async trackBySlug(slug, dto, meta) {
        const profile = await this.prisma.profile.findUnique({ where: { slug } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        await this.prisma.analyticsEvent.create({
            data: {
                profileId: profile.id,
                eventType: dto.eventType,
                linkId: dto.linkId,
                source: dto.source,
                ...meta,
            },
        });
        if (dto.linkId) {
            await this.prisma.link.update({
                where: { id: dto.linkId },
                data: { clickCount: { increment: 1 } },
            });
        }
        return { ok: true };
    }
    async summaryForUser(userId) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const [totalViews, byType, clicksByLink, recentEvents] = await Promise.all([
            this.prisma.analyticsEvent.count({ where: { profileId: profile.id, eventType: 'PROFILE_VIEW' } }),
            this.prisma.analyticsEvent.groupBy({
                by: ['eventType'],
                where: { profileId: profile.id },
                _count: { _all: true },
            }),
            this.prisma.link.findMany({
                where: { profileId: profile.id },
                select: { id: true, title: true, clickCount: true },
                orderBy: { clickCount: 'desc' },
            }),
            this.prisma.analyticsEvent.findMany({
                where: { profileId: profile.id },
                orderBy: { createdAt: 'desc' },
                take: 50,
            }),
        ]);
        return { totalViews, byType, clicksByLink, recentEvents };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map