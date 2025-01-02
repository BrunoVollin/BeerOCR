import { ExtractBrandFromImageUseCase } from './extractBrandFromImage.usecase';
import { ImageAnalysisRepositoryInterface } from 'src/core/domain/repositories/ImageAnalysisRepositoryInterface';
import { OCRGatewayInterface } from 'src/core/domain/repositories/OCRGatewayInterface';

const mockOCRGateway: OCRGatewayInterface = {
  processImage: jest.fn(),
};

const mockImageAnalysisRepository: ImageAnalysisRepositoryInterface = {
  save: jest.fn(),
};

describe('ExtractBrandFromImageUseCase', () => {
  let useCase: ExtractBrandFromImageUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ExtractBrandFromImageUseCase(mockOCRGateway, mockImageAnalysisRepository);
  });

  it('should return the brand name extracted by OCRGateway', async () => {
    const mockFile: Express.Multer.File = {
      buffer: Buffer.from('mock file content'),
    } as any;

    const mockBrandName = 'Test Brand';
    (mockOCRGateway.processImage as jest.Mock).mockResolvedValue(mockBrandName);

    const result = await useCase.execute({ file: mockFile });

    expect(result).toBe(mockBrandName);
    expect(mockOCRGateway.processImage).toHaveBeenCalledWith(mockFile);
    expect(mockImageAnalysisRepository.save).toHaveBeenCalledWith(
      mockFile.buffer,
      mockBrandName,
      expect.any(Date),
    );
  });

  it('should throw an error when OCRGateway fails', async () => {
    const mockFile: Express.Multer.File = {
      buffer: Buffer.from('mock file content'),
    } as any;

    const mockError = new Error('OCR failed');
    (mockOCRGateway.processImage as jest.Mock).mockRejectedValue(mockError);

    await expect(useCase.execute({ file: mockFile })).rejects.toThrow('OCR failed');
    expect(mockOCRGateway.processImage).toHaveBeenCalledWith(mockFile);
    expect(mockImageAnalysisRepository.save).not.toHaveBeenCalled();
  });

  it('should throw an error when ImageAnalysisRepository fails', async () => {
    const mockFile: Express.Multer.File = {
      buffer: Buffer.from('mock file content'),
    } as any;

    const mockBrandName = 'Test Brand';
    const mockError = new Error('Save failed');

    (mockOCRGateway.processImage as jest.Mock).mockResolvedValue(mockBrandName);
    (mockImageAnalysisRepository.save as jest.Mock).mockRejectedValue(mockError);

    await expect(useCase.execute({ file: mockFile })).rejects.toThrow('Save failed');
    expect(mockOCRGateway.processImage).toHaveBeenCalledWith(mockFile);
    expect(mockImageAnalysisRepository.save).toHaveBeenCalledWith(
      mockFile.buffer,
      mockBrandName,
      expect.any(Date),
    );
  });
});
