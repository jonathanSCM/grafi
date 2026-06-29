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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const limits_1 = require("../plans/limits");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listUsers() {
        const users = await this.prisma.user.findMany({
            include: { profile: true, plan: true, company: { include: { plan: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return users.map(({ password, ...rest }) => ({
            ...rest,
            effectiveButtonLimit: (0, limits_1.effectiveButtonLimit)(rest),
        }));
    }
    async updateUserLimits(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.planId !== undefined ? { planId: dto.planId } : {}),
                ...(dto.buttonLimitOverride !== undefined ? { buttonLimitOverride: dto.buttonLimitOverride } : {}),
            },
            include: { plan: true },
        });
    }
    async createUser(dto) {
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
                planId: dto.planId,
                companyId: dto.companyId,
            },
        });
        const { password, ...rest } = user;
        return rest;
    }
    async updateStatus(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({ where: { id: userId }, data: { status: dto.status } });
    }
    async listCards() {
        const profiles = await this.prisma.profile.findMany({
            include: { card: true, user: true },
            orderBy: { createdAt: 'desc' },
        });
        return profiles.map(({ user, ...rest }) => {
            const { password, ...userRest } = user;
            return { ...rest, user: userRest };
        });
    }
    async updateCard(profileId, dto) {
        const profile = await this.prisma.profile.findUnique({ where: { id: profileId } });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (dto.serial) {
            const existing = await this.prisma.card.findUnique({ where: { serial: dto.serial } });
            if (existing && existing.profileId !== profile.id) {
                throw new common_1.ConflictException('Ese número de serie ya está registrado en otra tarjeta');
            }
        }
        const base = process.env.PUBLIC_BASE_URL ?? 'https://dominio.com';
        const url = `${base}/${profile.slug}`;
        return this.prisma.card.upsert({
            where: { profileId: profile.id },
            update: {
                ...(dto.serial !== undefined ? { serial: dto.serial } : {}),
                ...(dto.programmed !== undefined ? { programmed: dto.programmed } : {}),
                url,
            },
            create: { profileId: profile.id, serial: dto.serial, programmed: dto.programmed ?? false, url },
        });
    }
    analyticsOverview() {
        return this.prisma.analyticsEvent.groupBy({
            by: ['eventType'],
            _count: { _all: true },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map