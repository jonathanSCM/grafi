import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { VcardService } from './vcard.service';

@Controller('vcard')
export class VcardController {
  constructor(private readonly vcardService: VcardService) {}

  @Get(':slug')
  async download(@Param('slug') slug: string, @Res() res: Response) {
    const vcard = await this.vcardService.buildVcardBySlug(slug);
    res.set({
      'Content-Type': 'text/vcard',
      'Content-Disposition': `attachment; filename="${slug}.vcf"`,
    });
    res.send(vcard);
  }
}
