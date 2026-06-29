import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ReorderLinksDto } from './dto/reorder-links.dto';

@UseGuards(JwtAuthGuard)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  list(@Req() req: any) {
    return this.linksService.list(req.user.userId);
  }

  @Get('limit')
  limit(@Req() req: any) {
    return this.linksService.getLimit(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateLinkDto) {
    return this.linksService.create(req.user.userId, dto);
  }

  @Patch('reorder')
  reorder(@Req() req: any, @Body() dto: ReorderLinksDto) {
    return this.linksService.reorder(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateLinkDto) {
    return this.linksService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.linksService.remove(req.user.userId, id);
  }
}
