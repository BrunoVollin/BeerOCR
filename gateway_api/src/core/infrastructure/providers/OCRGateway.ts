import { OCRGatewayInterface } from 'src/core/domain/repositories/OCRGatewayInterface';
import { lastValueFrom, Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';

interface OCRService {
  processImage(data: any): Observable<any>;
}

@Injectable()
export class OCRGateway implements OCRGatewayInterface {
  private ocrService: OCRService;

  constructor(@Inject('OCR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ocrService = this.client.getService<OCRService>('OCRService');
  }

  async processImage(file: Express.Multer.File): Promise<string> {
    try {
      const request = {
        image: file.buffer,
        file_name: file.originalname,
        mime_type: file.mimetype,
      };

      const response = await lastValueFrom(this.ocrService.processImage(request));
      return response.brand;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
