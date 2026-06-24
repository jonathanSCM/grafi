import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
export declare class SocialLinksController {
    private readonly socialLinksService;
    constructor(socialLinksService: SocialLinksService);
    list(req: any): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }[]>;
    create(req: any, dto: CreateSocialLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }>;
    update(req: any, id: string, dto: UpdateSocialLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        profileId: string;
        platform: string;
    }>;
    remove(req: any, id: string): Promise<{
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
