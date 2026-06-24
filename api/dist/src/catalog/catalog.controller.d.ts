import { CatalogService } from './catalog.service';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    list(req: any): Promise<({
        assignedTo: {
            id: string;
            slug: string;
            fullName: string;
        }[];
    } & {
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    })[]>;
    create(req: any, dto: CreateCatalogItemDto): Promise<{
        assignedTo: {
            id: string;
            slug: string;
            fullName: string;
        }[];
    } & {
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    }>;
    update(req: any, id: string, dto: UpdateCatalogItemDto): Promise<{
        assignedTo: {
            id: string;
            slug: string;
            fullName: string;
        }[];
    } & {
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    }>;
}
export declare class PublicCatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    listPublic(slug: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    }[]>;
}
export declare class PublicCompanyCatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    listPublic(slug: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        isActive: boolean;
        order: number;
        description: string | null;
        title: string;
        image: string | null;
    }[]>;
}
