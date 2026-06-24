import type { Response } from 'express';
import { QrService } from './qr.service';
export declare class QrController {
    private readonly qrService;
    constructor(qrService: QrService);
    getMine(req: any, res: Response): Promise<void>;
}
