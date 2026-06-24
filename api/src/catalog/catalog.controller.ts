import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CatalogService } from './catalog.service';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('COMPANY_ADMIN', 'ADMIN')
@Controller('companies/me/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  list(@Req() req: any) {
    return this.catalogService.list(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateCatalogItemDto) {
    return this.catalogService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateCatalogItemDto) {
    return this.catalogService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.catalogService.remove(req.user.userId, id);
  }
}

@Controller('profiles/:slug/catalog')
export class PublicCatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  listPublic(@Param('slug') slug: string) {
    return this.catalogService.listForProfile(slug);
  }
}

@Controller('companies/public/:slug/catalog')
export class PublicCompanyCatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  listPublic(@Param('slug') slug: string) {
    return this.catalogService.listForCompanySlug(slug);
  }
}
