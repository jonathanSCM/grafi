import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ReorderLinksDto } from './dto/reorder-links.dto';
export declare class LinksService {
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
        type: import("@prisma/client").$Enums.LinkType;
        title: string;
        icon: string | null;
        clickCount: number;
    }[]>;
    create(userId: string, dto: CreateLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        type: import("@prisma/client").$Enums.LinkType;
        title: string;
        icon: string | null;
        clickCount: number;
    }>;
    update(userId: string, linkId: string, dto: UpdateLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        type: import("@prisma/client").$Enums.LinkType;
        title: string;
        icon: string | null;
        clickCount: number;
    }>;
    remove(userId: string, linkId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        type: import("@prisma/client").$Enums.LinkType;
        title: string;
        icon: string | null;
        clickCount: number;
    }>;
    reorder(userId: string, dto: ReorderLinksDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        type: import("@prisma/client").$Enums.LinkType;
        title: string;
        icon: string | null;
        clickCount: number;
    }[]>;
}
