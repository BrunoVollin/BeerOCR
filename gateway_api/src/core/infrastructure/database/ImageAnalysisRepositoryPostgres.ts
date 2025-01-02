import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageAnalysisRepositoryInterface } from 'src/core/domain/repositories/ImageAnalysisRepositoryInterface';

@Injectable()
export default class ImageAnalysisRepositoryPostgres
  implements ImageAnalysisRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Buffer<ArrayBufferLike>, brandName: string, requestedAt: Date): Promise<void> {
    await this.prisma.imageAnalysis.create({
      data: {
        data,
        brand: brandName,
        requestedAt,
      },
    });
  }
}
