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
exports.VcardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VcardService = class VcardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buildVcardBySlug(slug) {
        const profile = await this.prisma.profile.findUnique({
            where: { slug },
            include: { links: true, user: true },
        });
        if (!profile || !profile.isActive || profile.user.status !== 'ACTIVE') {
            throw new common_1.NotFoundException('Profile not found');
        }
        const phoneLink = profile.links.find((l) => l.type === 'CALL' || l.type === 'WHATSAPP');
        const emailLink = profile.links.find((l) => l.type === 'EMAIL');
        const websiteLink = profile.links.find((l) => l.type === 'WEBSITE');
        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${profile.fullName}`,
            profile.companyName ? `ORG:${profile.companyName}` : null,
            profile.position ? `TITLE:${profile.position}` : null,
            phoneLink ? `TEL;TYPE=CELL:${this.extractValue(phoneLink.url)}` : null,
            emailLink ? `EMAIL:${this.extractValue(emailLink.url)}` : `EMAIL:${profile.user.email}`,
            websiteLink ? `URL:${websiteLink.url}` : null,
            'END:VCARD',
        ].filter(Boolean);
        return lines.join('\r\n');
    }
    extractValue(url) {
        return url.replace(/^(tel:|mailto:|https?:\/\/wa\.me\/)/, '');
    }
};
exports.VcardService = VcardService;
exports.VcardService = VcardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VcardService);
//# sourceMappingURL=vcard.service.js.map