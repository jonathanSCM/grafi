import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    track(slug: string, dto: TrackEventDto, req: any): Promise<{
        ok: boolean;
    }>;
    summary(req: any): Promise<{
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
