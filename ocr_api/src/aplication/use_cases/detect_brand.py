from src.domain.repositories.brand_detector_interface import BrandDetector
from PIL import Image

class DetectBrand:
    def __init__(self, brand_detector: BrandDetector):
        self.brand_detector = brand_detector

    def execute(self, image: Image.Image) -> str:
        brand_name = self.brand_detector.detect(image)
        return brand_name
