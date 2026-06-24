import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('profiles/:slug/leads')
  createPublic(@Param('slug') slug: string, @Body() dto: CreateLeadDto) {
    return this.leadsService.createForSlug(slug, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('leads')
  listMine(@Req() req: any) {
    return this.leadsService.listForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('companies/me/leads')
  listForCompany(@Req() req: any) {
    return this.leadsService.listForCompany(req.user.userId);
  }
}
