from abc import ABC, abstractmethod

class BrandDetector(ABC):
    @abstractmethod
    def detect(self, image_data: bytes) -> str:
        pass
