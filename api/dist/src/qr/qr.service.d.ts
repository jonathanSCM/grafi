import { PrismaService } from '../prisma/prisma.service';
export declare class QrService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildProfileUrl;
    getQrPngForUser(userId: string): Promise<Buffer>;
}
