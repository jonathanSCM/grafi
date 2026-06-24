import { PrismaService } from '../prisma/prisma.service';
export declare class VcardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buildVcardBySlug(slug: string): Promise<string>;
    private extractValue;
}
