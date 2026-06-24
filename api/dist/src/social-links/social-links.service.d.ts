import { PrismaService } from '../prisma/prisma.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
export declare class SocialLinksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getOwnedProfileId;
    private assertOwnership;
    list(userId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }[]>;
    create(userId: string, dto: CreateSocialLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }>;
    update(userId: string, id: string, dto: UpdateSocialLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }>;
    remove(userId: string, id: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }>;
}
