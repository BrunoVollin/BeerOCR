import { Module } from '@nestjs/common';
import { ExtractBrandFromImageUseCase } from 'src/core/application/usecases/extractBrandFromImage.usecase';
import { OCRGatewayInterface } from 'src/core/domain/repositories/OCRGatewayInterface';
import { OCRGateway } from 'src/core/infrastructure/providers/OCRGateway';
import { UploadController } from './upload.controller';
import ImageAnalysisRepositoryPostgres from 'src/core/infrastructure/database/ImageAnalysisRepositoryPostgres';
import { ImageAnalysisRepositoryInterface } from 'src/core/domain/repositories/ImageAnalysisRepositoryInterface';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'OCR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.OCR_API_URL,
          package: 'ocr',
          protoPath: join(__dirname, 'ocr.proto'),
        },
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [
    PrismaService,
    {
      provide: 'OCRGatewayInterface',
      useClass: OCRGateway,
    },
    {
      provide: 'ImageAnalysisRepositoryInterface',
      useClass: ImageAnalysisRepositoryPostgres,
    },
    {
      provide: ExtractBrandFromImageUseCase,
      useFactory: (
        oCRGateway: OCRGatewayInterface,
        imageAnalysisRepository: ImageAnalysisRepositoryInterface,
      ) =>
        new ExtractBrandFromImageUseCase(oCRGateway, imageAnalysisRepository),
      inject: ['OCRGatewayInterface', 'ImageAnalysisRepositoryInterface'],
    },
  ],
})
export class UploadModule {}
