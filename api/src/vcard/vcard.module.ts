import { Module } from '@nestjs/common';
import { VcardService } from './vcard.service';
import { VcardController } from './vcard.controller';

@Module({
  controllers: [VcardController],
  providers: [VcardService],
})
export class VcardModule {}
