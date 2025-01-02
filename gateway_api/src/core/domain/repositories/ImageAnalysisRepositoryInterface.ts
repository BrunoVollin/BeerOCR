export interface ImageAnalysisRepositoryInterface {
  save(data: Buffer, brandName: string, requestedAt: Date): Promise<void>;
}
