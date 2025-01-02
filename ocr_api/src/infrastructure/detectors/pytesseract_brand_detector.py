from src.domain.repositories.brand_detector_interface import BrandDetector
import cv2
import numpy as np
from PIL import Image
import os


class PytesseractDetector(BrandDetector):
    def __init__(self):
        """
        Initialize the detector with known images and their associated brand names.

        :param known_images: Dictionary where keys are file paths to known brand images
                     and values are brand names.
        """

        base_path = os.path.dirname(os.path.abspath(__file__))
        dataset_path = os.path.join(base_path, 'dataset')

        known_images = {}
        
        all_images_paths_from_dataset = os.listdir(dataset_path) 
        
        for image_path in all_images_paths_from_dataset:
            known_images[os.path.join(dataset_path, image_path)] = image_path.split(' ')[0].capitalize()
            
        self.known_images = {
            image_path: (cv2.imread(image_path, cv2.IMREAD_GRAYSCALE), brand)
            for image_path, brand in known_images.items()
        }

        self.orb = cv2.ORB_create()

    def detect(self, image: Image) -> str:
        """
        Detect the brand by comparing the given image with known images.

        :param image: PIL Image object (new image to compare).
        :return: The detected brand name or 'Unknown' if no match is found.
        """
        new_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
        
        new_keypoints, new_descriptors = self.orb.detectAndCompute(new_image, None)

        if new_descriptors is None:
            return "Unknown"

        best_match = None
        max_good_matches = 0
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

        for known_image, brand in self.known_images.values():
            known_keypoints, known_descriptors = self.orb.detectAndCompute(known_image, None)
            if known_descriptors is None:
                continue

            matches = bf.match(new_descriptors, known_descriptors)
            good_matches = [m for m in matches if m.distance < 50] 

            if len(good_matches) > max_good_matches:
                max_good_matches = len(good_matches)
                best_match = brand
    

        return best_match if best_match else "Unknown"
