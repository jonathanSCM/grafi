import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const unique = randomUUID();
          callback(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
          callback(new BadRequestException('Tipo de archivo no permitido'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const base = process.env.PUBLIC_API_URL ?? `http://localhost:${process.env.PORT ?? 3001}`;
    return { url: `${base}/uploads/${file.filename}` };
  }
}
