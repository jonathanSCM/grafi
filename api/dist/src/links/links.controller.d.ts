import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ReorderLinksDto } from './dto/reorder-links.dto';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
    list(req: any): Promise<{
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
    create(req: any, dto: CreateLinkDto): Promise<{
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
    reorder(req: any, dto: ReorderLinksDto): Promise<{
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
    update(req: any, id: string, dto: UpdateLinkDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
