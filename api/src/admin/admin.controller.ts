import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { AdminUpdateCardDto } from '../cards/dto/admin-update-card.dto';
import { UpdateUserLimitDto } from '../plans/dto/update-user-limit.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  listUsers() {
    return this.adminService.listUsers();
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.adminService.createUser(dto);
  }

  @Patch('users/:id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateStatus(id, dto);
  }

  @Patch('users/:id/limits')
  updateLimits(@Param('id') id: string, @Body() dto: UpdateUserLimitDto) {
    return this.adminService.updateUserLimits(id, dto);
  }

  @Get('cards')
  listCards() {
    return this.adminService.listCards();
  }

  @Patch('cards/:profileId')
  updateCard(@Param('profileId') profileId: string, @Body() dto: AdminUpdateCardDto) {
    return this.adminService.updateCard(profileId, dto);
  }

  @Get('analytics/overview')
  analyticsOverview() {
    return this.adminService.analyticsOverview();
  }
}
