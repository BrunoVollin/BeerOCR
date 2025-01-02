import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post, Body, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ExtractBrandFromImageUseCase } from '../../core/application/usecases/extractBrandFromImage.usecase';


@Controller('upload')
export class UploadController {
  constructor(
    private readonly extractBrandFromImageUseCase: ExtractBrandFromImageUseCase,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const brandName = await this.extractBrandFromImageUseCase.execute({
        file,
      });
      return res.status(200).json({
        brandName,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }
}
