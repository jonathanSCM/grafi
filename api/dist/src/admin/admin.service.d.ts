import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listUsers(): import("@prisma/client").Prisma.PrismaPromise<({
        company: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            theme: import("@prisma/client").$Enums.Theme;
            logo: string | null;
            backgroundType: import("@prisma/client").$Enums.BackgroundType;
            backgroundColor: string | null;
            backgroundTo: string | null;
            buttonColor: string | null;
            buttonTextColor: string | null;
            textColor: string | null;
            description: string | null;
            website: string | null;
            redirectEnabled: boolean;
        } | null;
        plan: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            priceMonthly: import("@prisma/client-runtime-utils").Decimal;
            features: import("@prisma/client/runtime/client").JsonValue;
        } | null;
        profile: {
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
        } | null;
    } & {
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
    })[]>;
    createUser(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        planId: string | null;
        companyId: string | null;
    }>;
    updateStatus(userId: string, dto: UpdateUserStatusDto): Promise<{
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
    }>;
    listCards(): import("@prisma/client").Prisma.PrismaPromise<({
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
    analyticsOverview(): import("@prisma/client").Prisma.GetAnalyticsEventGroupByPayload<{
        by: "eventType"[];
        _count: {
            _all: true;
        };
    }>;
}
