import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): string {
    return `
    <h1>OCR Project</h1>
    <h2>Upload an image file to extract the brand name. Supports Brahma, Spaten, and Corona.</h2>
    <form method='post' action='/upload' enctype='multipart/form-data'>
      <input type='file' name='file' />
      <input type='submit' value='Upload' />
    </form>
    `;
  }
}
