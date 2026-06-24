import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';

@UseGuards(JwtAuthGuard)
@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  list(@Req() req: any) {
    return this.socialLinksService.list(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateSocialLinkDto) {
    return this.socialLinksService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.socialLinksService.remove(req.user.userId, id);
  }
}
