import { ImageAnalysisRepositoryInterface } from 'src/core/domain/repositories/ImageAnalysisRepositoryInterface';
import { OCRGatewayInterface } from 'src/core/domain/repositories/OCRGatewayInterface';

export class ExtractBrandFromImageUseCase {
  constructor(
    private readonly ocrGateway: OCRGatewayInterface,
    private readonly imageAnalysesRepository: ImageAnalysisRepositoryInterface,
  ) {}

  async execute(input: Input): Promise<string> {
    try {
      const brandName = await this.ocrGateway.processImage(input.file);
      const requestedAt = new Date();
      await this.imageAnalysesRepository.save(input.file.buffer, brandName, requestedAt);

      return brandName;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

type Input = {
  file: Express.Multer.File;
};
