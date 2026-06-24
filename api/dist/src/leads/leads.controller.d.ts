import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    createPublic(slug: string, dto: CreateLeadDto): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        message: string | null;
        profileId: string;
        source: string | null;
        phone: string | null;
    }>;
    listMine(req: any): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        message: string | null;
        profileId: string;
        source: string | null;
        phone: string | null;
    }[]>;
    listForCompany(req: any): Promise<{
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
