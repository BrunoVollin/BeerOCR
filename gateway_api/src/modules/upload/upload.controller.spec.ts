import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { ExtractBrandFromImageUseCase } from '../../core/application/usecases/extractBrandFromImage.usecase';
import { Response } from 'express';

describe('UploadController', () => {
  let uploadController: UploadController;
  let extractBrandFromImageUseCase: ExtractBrandFromImageUseCase;
  let response: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: ExtractBrandFromImageUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    uploadController = module.get<UploadController>(UploadController);
    extractBrandFromImageUseCase = module.get<ExtractBrandFromImageUseCase>(ExtractBrandFromImageUseCase);
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
  });

  it('should be defined', () => {
    expect(uploadController).toBeDefined();
  });

  it('should return 400 if no file is uploaded', async () => {
    await uploadController.uploadFile(response, null);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'No file uploaded' });
  });

  it('should return 200 and brand name on successful file upload', async () => {
    const file = { originalname: 'image.jpg' } as any;
    const brandName = 'Corona';
    extractBrandFromImageUseCase.execute = jest.fn().mockResolvedValue(brandName);

    await uploadController.uploadFile(response, file);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ brandName });
  });

  it('should return 500 if ExtractBrandFromImageUseCase throws an error', async () => {
    const file = { originalname: 'image.jpg' } as any; 
    const errorMessage = 'Error extracting brand';
    extractBrandFromImageUseCase.execute = jest.fn().mockRejectedValue(new Error(errorMessage));

    await uploadController.uploadFile(response, file);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal server error',
      error: errorMessage,
    });
  });
});
