import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { LinksModule } from './links/links.module';
import { QrModule } from './qr/qr.module';
import { VcardModule } from './vcard/vcard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { UploadsModule } from './uploads/uploads.module';
import { CompaniesModule } from './companies/companies.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfilesModule,
    LinksModule,
    QrModule,
    VcardModule,
    AnalyticsModule,
    AdminModule,
    SocialLinksModule,
    UploadsModule,
    CompaniesModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
