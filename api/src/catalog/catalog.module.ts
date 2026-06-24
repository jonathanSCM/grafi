import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import {
  CatalogController,
  PublicCatalogController,
  PublicCompanyCatalogController,
} from './catalog.controller';

@Module({
  controllers: [CatalogController, PublicCatalogController, PublicCompanyCatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
