import { PrismaService } from '../prisma/prisma.service';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
export declare class CatalogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getCompanyId;
    private assertOwnership;
    list(userId: string): Promise<({
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
    create(userId: string, dto: CreateCatalogItemDto): Promise<{
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
    update(userId: string, itemId: string, dto: UpdateCatalogItemDto): Promise<{
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
    remove(userId: string, itemId: string): Promise<{
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
    listForProfile(slug: string): Promise<{
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
    listForCompanySlug(slug: string): Promise<{
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
