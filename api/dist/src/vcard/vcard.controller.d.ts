import type { Response } from 'express';
import { VcardService } from './vcard.service';
export declare class VcardController {
    private readonly vcardService;
    constructor(vcardService: VcardService);
    download(slug: string, res: Response): Promise<void>;
}
