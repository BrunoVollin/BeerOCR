import grpc
from concurrent import futures
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'generated'))

import ocr_pb2
import ocr_pb2_grpc
from PIL import Image
import io
from src.aplication.use_cases.detect_brand import DetectBrand
from src.infrastructure.detectors.pytesseract_brand_detector import PytesseractDetector
import datetime

class OCRService(ocr_pb2_grpc.OCRServiceServicer):
    def ProcessImage(self, request, context):
        image_data = request.image
        image = Image.open(io.BytesIO(image_data))
        
        detect_brand = DetectBrand(PytesseractDetector())
        brand_name = detect_brand.execute(image)
        
        return ocr_pb2.ImageResponse(brand=brand_name)

def start_grpc_server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ocr_pb2_grpc.add_OCRServiceServicer_to_server(OCRService(), server)
    port = os.getenv('PORT', '50051')
    server.add_insecure_port(f'[::]:{port}')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    start_grpc_server()
