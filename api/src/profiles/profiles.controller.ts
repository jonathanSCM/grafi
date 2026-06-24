import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateProfileDto) {
    return this.profilesService.createForUser(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMine(@Req() req: any) {
    return this.profilesService.findByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMine(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.profilesService.updateByUserId(req.user.userId, dto);
  }

  @Get(':slug')
  findPublic(@Param('slug') slug: string) {
    return this.profilesService.findBySlug(slug);
  }
}
