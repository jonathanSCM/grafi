import { PrismaService } from '../prisma/prisma.service';
import { RegisterCardDto } from './dto/register-card.dto';
import { MarkProgrammedDto } from './dto/mark-programmed.dto';
export declare class CardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildProfileUrl;
    getMine(userId: string): Promise<{
        card: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            serial: string | null;
            programmed: boolean;
        } | null;
        profileUrl: string;
    }>;
    registerMine(userId: string, dto: RegisterCardDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        serial: string | null;
        programmed: boolean;
    }>;
    markProgrammed(userId: string, dto: MarkProgrammedDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        serial: string | null;
        programmed: boolean;
    }>;
    listAllForAdmin(): import("@prisma/client").Prisma.PrismaPromise<({
        profile: {
            user: {
                password: string;
                name: string;
                email: string;
                id: string;
                role: import("@prisma/client").$Enums.Role;
                status: import("@prisma/client").$Enums.UserStatus;
                createdAt: Date;
                updatedAt: Date;
                planId: string | null;
                companyId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            fullName: string;
            position: string | null;
            companyName: string | null;
            bio: string | null;
            theme: import("@prisma/client").$Enums.Theme;
            photoStyle: import("@prisma/client").$Enums.PhotoStyle;
            photo: string | null;
            logo: string | null;
            backgroundType: import("@prisma/client").$Enums.BackgroundType;
            backgroundColor: string | null;
            backgroundTo: string | null;
            buttonColor: string | null;
            buttonTextColor: string | null;
            textColor: string | null;
            userId: string;
            isActive: boolean;
        };
    } & {
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        serial: string | null;
        programmed: boolean;
    })[]>;
}
