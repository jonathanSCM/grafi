import { CardsService } from './cards.service';
import { RegisterCardDto } from './dto/register-card.dto';
import { MarkProgrammedDto } from './dto/mark-programmed.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    getMine(req: any): Promise<{
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
    registerMine(req: any, dto: RegisterCardDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        serial: string | null;
        programmed: boolean;
    }>;
    markProgrammed(req: any, dto: MarkProgrammedDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        serial: string | null;
        programmed: boolean;
    }>;
}
