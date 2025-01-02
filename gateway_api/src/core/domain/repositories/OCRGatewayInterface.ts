export interface OCRGatewayInterface {
    processImage(imageBuffer: Express.Multer.File): Promise<string>;
}