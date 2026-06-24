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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CardsService = class CardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildProfileUrl(slug) {
        const base = process.env.PUBLIC_BASE_URL ?? 'https://dominio.com';
        return `${base}/${slug}`;
    }
    async getMine(userId) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const card = await this.prisma.card.findUnique({ where: { profileId: profile.id } });
        return {
            card,
            profileUrl: this.buildProfileUrl(profile.slug),
        };
    }
    async registerMine(userId, dto) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (dto.serial) {
            const existing = await this.prisma.card.findUnique({ where: { serial: dto.serial } });
            if (existing && existing.profileId !== profile.id) {
                throw new common_1.ConflictException('Ese número de serie ya está registrado en otra tarjeta');
            }
        }
        const url = this.buildProfileUrl(profile.slug);
        return this.prisma.card.upsert({
            where: { profileId: profile.id },
            update: { serial: dto.serial, url },
            create: { profileId: profile.id, serial: dto.serial, url },
        });
    }
    async markProgrammed(userId, dto) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const card = await this.prisma.card.findUnique({ where: { profileId: profile.id } });
        if (!card) {
            throw new common_1.NotFoundException('Card not registered yet');
        }
        return this.prisma.card.update({ where: { id: card.id }, data: { programmed: dto.programmed } });
    }
    listAllForAdmin() {
        return this.prisma.card.findMany({
            include: { profile: { include: { user: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CardsService);
//# sourceMappingURL=cards.service.js.map