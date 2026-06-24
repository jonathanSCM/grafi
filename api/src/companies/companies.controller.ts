import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AddCompanyUserDto } from './dto/add-company-user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/companies')
export class AdminCompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  list() {
    return this.companiesService.listAll();
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.companiesService.getDetailForAdmin(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @Post(':id/assign')
  assign(@Param('id') id: string, @Body() dto: AssignUserDto) {
    return this.companiesService.assignUser(id, dto);
  }

  @Post('unassign/:userId')
  unassign(@Param('userId') userId: string) {
    return this.companiesService.unassignUser(userId);
  }
}

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN', 'ADMIN')
  @Get('me')
  getMine(@Req() req: any) {
    return this.companiesService.getMyCompany(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN', 'ADMIN')
  @Patch('me')
  updateMine(@Req() req: any, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.updateMine(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN', 'ADMIN')
  @Post('me/users')
  addUser(@Req() req: any, @Body() dto: AddCompanyUserDto) {
    return this.companiesService.addUserToMyCompany(req.user.userId, dto);
  }

  @Get('public/:slug')
  getPublic(@Param('slug') slug: string) {
    return this.companiesService.getPublicBySlug(slug);
  }
}
