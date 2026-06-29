import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        maxButtons: number;
        maxCollaborators: number;
        features: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    create(dto: CreatePlanDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        maxButtons: number;
        maxCollaborators: number;
        features: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: string, dto: UpdatePlanDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        maxButtons: number;
        maxCollaborators: number;
        features: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
