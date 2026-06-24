import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { RegisterCardDto } from './dto/register-card.dto';
import { MarkProgrammedDto } from './dto/mark-programmed.dto';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('me')
  getMine(@Req() req: any) {
    return this.cardsService.getMine(req.user.userId);
  }

  @Post('me')
  registerMine(@Req() req: any, @Body() dto: RegisterCardDto) {
    return this.cardsService.registerMine(req.user.userId, dto);
  }

  @Patch('me/programmed')
  markProgrammed(@Req() req: any, @Body() dto: MarkProgrammedDto) {
    return this.cardsService.markProgrammed(req.user.userId, dto);
  }
}
