import { PrismaService } from '../prisma/prisma.service';
import { TrackEventDto } from './dto/track-event.dto';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    trackBySlug(slug: string, dto: TrackEventDto, meta: {
        ipHash?: string;
        device?: string;
        browser?: string;
        country?: string;
    }): Promise<{
        ok: boolean;
    }>;
    summaryForUser(userId: string): Promise<{
        totalViews: number;
        byType: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AnalyticsEventGroupByOutputType, "eventType"[]> & {
            _count: {
                _all: number;
            };
        })[];
        clicksByLink: {
            id: string;
            title: string;
            clickCount: number;
        }[];
        recentEvents: {
            id: string;
            createdAt: Date;
            profileId: string;
            eventType: import("@prisma/client").$Enums.EventType;
            linkId: string | null;
            source: string | null;
            ipHash: string | null;
            device: string | null;
            browser: string | null;
            country: string | null;
        }[];
    }>;
}
