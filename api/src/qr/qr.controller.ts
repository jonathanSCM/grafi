import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QrService } from './qr.service';

@UseGuards(JwtAuthGuard)
@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get('me')
  async getMine(@Req() req: any, @Res() res: Response) {
    const buffer = await this.qrService.getQrPngForUser(req.user.userId);
    res.set({ 'Content-Type': 'image/png', 'Content-Disposition': 'inline; filename="qr.png"' });
    res.send(buffer);
  }
}
