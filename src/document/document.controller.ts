import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CustomUploadInterceptor } from 'src/interceptors/upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload/:employeeId')
  @UseInterceptors(FileInterceptor('File', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, uniqueSuffix + path.extname(file.originalname));
        },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    console.log('File uploaded:', file)
    if (!file) {
        throw new Error('No file uploaded');
    }
    return this.documentService.create(file.path, file.filename, employeeId);
  }
}

