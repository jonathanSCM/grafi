import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createForSlug(slug: string, dto: CreateLeadDto): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        message: string | null;
        profileId: string;
        source: string | null;
        phone: string | null;
    }>;
    listForUser(userId: string): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        message: string | null;
        profileId: string;
        source: string | null;
        phone: string | null;
    }[]>;
    listForCompany(userId: string): Promise<{
        collaborator: {
            id: string;
            slug: string;
            fullName: string;
        } | null;
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        message: string | null;
        profileId: string;
        source: string | null;
        phone: string | null;
    }[]>;
}
