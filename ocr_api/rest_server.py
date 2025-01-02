from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io
from src.aplication.use_cases.detect_brand import DetectBrand
from src.infrastructure.detectors.pytesseract_brand_detector import PytesseractDetector

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to ORC API!"}

@app.post("/process-image")
async def process_image(
    file: UploadFile = File(...)
):
    detect_brand = DetectBrand(PytesseractDetector())
    image = Image.open(io.BytesIO(await file.read()))
    brand_name = await detect_brand.execute(image)
    return {"brand": brand_name}
